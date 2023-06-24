type Listener = (...args: any[]) => void | Promise<void>

interface IWillNull<T> {
    expect(message: string): T
    unwrap(): T
    isNull(): boolean
}

class WillNull<T> implements IWillNull<T> {

    static NullErr = Error('Null values that may cause errors.')

    constructor(
        private val: T | null
    ) {}

    setValue(val: T | null) {
        this.val = val
    }

    isNull() {
        return this.val === null
    }

    expect(message: string): T {
        if (this.val !== null) {
            return this.val
        }

        throw Error(`${message}`)
    }

    unwrap(): T {
        if (this.val !== null) {
            return this.val
        }

        throw WillNull.NullErr
    }
    
}

function Maybe<T>(val: T | null) {
    return new WillNull<T>(val)
}

function Null<T>() {
    return new WillNull<T>(null)
}

interface ILinked {
    prev: WillNull<ILinked>
    next: WillNull<ILinked>
    raw: WillNull<Listener>
    handler: WillNull<Listener>
    connect(linked: Linked): Linked
    disconnect(): Linked
    record(listener: Listener | null, raw?: Listener | null): void
}

class Linked implements ILinked {
    prev: WillNull<ILinked> = Null()
    next: WillNull<ILinked> = Null()
    raw: WillNull<Listener> = Null()
    handler: WillNull<Listener> = Null()

    connect(linked: Linked): Linked {
        linked.next.setValue(
            this.next.expect('Do not operate Linked alone')
        )

        this.next.expect('Do not operate Linked alone')
            .prev.setValue(linked)

        this.next.setValue(linked)
        linked.prev.setValue(this)

        return linked
    }

    disconnect(): Linked {
        const prevErr = 'get prev fail at disconnect'
        const nextErr = 'get next fail at disconnect'
        this.prev.expect(prevErr)
            .next
            .setValue(
                this.next.expect(nextErr)
            )
        
        this.next.expect(nextErr)
            .prev.setValue(this.prev.expect(prevErr))
        
        this.prev.setValue(null)
        this.next.setValue(null)

        return this
    }

    record(listener: Listener | null, raw?: Listener | null) {
        this.handler.setValue(listener)
        
        if (raw) {
            this.raw.setValue(raw)
        }
    }
}


class IndexedLinked {

    private rawRecord = new Map<Listener, Linked>() 
    private record = new Map<Listener, Linked>()
    readonly Entry = new Linked()
    readonly End = new Linked()
    private _pointer = this.Entry

    constructor(
        public thisArg: () => any = () => ({})
    ) {
        this.Entry.next.setValue(this.End)
        this.End.prev.setValue(this.Entry)
    }

    size() {
        return this.record.size
    }

    private _recordNode(k: Listener, v: Linked): boolean {       
        if (this.record.has(k)) {
            return false
        }

        this.record.set(k, v)
        return true
    }

    private _recordRawNode(k: Listener, v: Linked): boolean {
        if (this.rawRecord.has(k)) {
            return false
        }

        this.rawRecord.set(k, v)
        this._recordNode(v.handler.unwrap(), v)
        return true
    }

    private _creator(listener: Listener) {
        let node = new Linked()
        node.record(listener)

        return node
    }

    private _onceCreator(listener: Listener): Linked {
        let node = new Linked()
        let self = this

        const wrapper = (...args: any[]) => {   
            try {
                node.raw.expect('The function used to wrap is empty')
                    .apply(self.thisArg(), args)  
            } finally {
                self.deleteNode(node)
            }
        }

        node.record(wrapper, listener)

        return node
    }

    put(listener: Listener) {
        const node = this._creator(listener)
        if (this._recordNode(listener, node)) {
            this._pointer.connect(node)
            this._pointer = node
        }
    }

    prepend(listener: Listener) {
        const node = this._creator(listener)
        if (this._recordNode(listener, node)) {
            this.Entry.connect(node)
        }
    }

    once(listener: Listener) {
        const node = this._onceCreator(listener)

        try {
            if (this._recordRawNode(node.raw.unwrap(), node)) {
                this._pointer.connect(node)
                this._pointer = node
            }
            
        } finally {}
    }

    prependOnce(listener: Listener) {
        const node = this._onceCreator(listener)

        try {
            if (this._recordRawNode(node.raw.unwrap(), node)) {
                this.Entry.connect(node)
            }
            
        } finally {}
    }

    deleteNode(node: ILinked): boolean {
        try {
            if (this._pointer === node) {
                this._pointer = node.prev.unwrap()
            }

            if (!node.raw.isNull()) {
                this.rawRecord.delete(node.raw.unwrap())
            }

            this.record.delete(node.handler.unwrap())
            node.disconnect()
            return true
        } catch (_) {
            return false
        }
    }

    delete(listener: Listener): boolean {
        if (this.rawRecord.has(listener)) {
            const linked = Maybe(this.rawRecord.get(listener) || null).expect("Don't modify Linekd outside of IndexedLinked")

            this.deleteNode(linked)
            return true
        }

        if (this.record.has(listener)) {
            const linked = Maybe(this.record.get(listener) || null)
                .expect("Don't modify Linekd outside of IndexedLinked")

            this.deleteNode(linked)
            return true
        }

        return false
    }

    free() {
        let toDel = this.Entry.next.expect('Free error')

        while(toDel !== this.End) {
            const toDelNext = toDel.next.expect('Free error')
            this.deleteNode(toDel)
            toDel = toDelNext
        }

        this._pointer = this.Entry
    }

}

type EventType = string | symbol
type EventHandler = Listener

interface EventEmitterOptions {
    thisArg?: any;
    captureRejections?: boolean;
}

export class EventEmitter {
    private maxListeners = -1
    public thisArg: any = {}
    private _events: {[k: EventType]: IndexedLinked} = {}
    private captureRejections = false

    setMaxListeners(size: number): EventEmitter {
        this.maxListeners = size
        return this
    }

    getMaxListeners(): number {
        return this.maxListeners
    }

    private _thisGetter = () => this.thisArg

    private _getEventLinked(type: EventType) {
        let linked: IndexedLinked
        if (!(linked = this._events[type])) {
            linked = this._events[type] = new IndexedLinked(this._thisGetter)
        }

        return linked
    }

    private _canAddNew(size: number) {
        return this.maxListeners !== -1 && size === this.maxListeners
    }

    private _addListener(type: EventType, handler: Listener, prepend=false, once=false) {
        const linked = this._getEventLinked(type)

        if (this._canAddNew(linked.size())) {
            this._emitError(
                RangeError('Listeners is full and cannot join a new listener, please use setMaxListeners to resize')
            )
            return
        }

        if (prepend) {
            if (once) {
                linked.prependOnce(handler)
            } else {
                linked.prepend(handler)
            }

            return
        }


        if (once) {
            linked.once(handler)
        } else {
            linked.put(handler)
        }

    }

    addListener(type: EventType, handler: EventHandler): EventEmitter {
        this._addListener(type, handler)
        return this
    }


    on(type: EventType, handler: EventHandler): EventEmitter {
        this._addListener(type, handler)
        return this
    }


    prependListener(type: EventType, handler: EventHandler): EventEmitter {
        this._addListener(type, handler, true)
        return this
    }


    removeListener(type: EventType, handler: EventHandler): EventEmitter {
        const eventLinked = this._getEventLinked(type)
        eventLinked.delete(handler)

        return this
    }


    off(type: EventType, handler: EventHandler): EventEmitter {
        const eventLinked = this._getEventLinked(type)
        eventLinked.delete(handler)

        return this
    }


    removeAllListeners(type: EventType): void {
        this._getEventLinked(type).free()
    }

    private _emit(type: EventType, nullContext = false, ...args: any[]) {
        const l = this._getEventLinked(type)
        const ctx = this.thisArg

        this.thisArg = nullContext
            ? undefined
            : ctx

        let cur = l.Entry.next.expect('EventEmitter$_emit')
        while (cur !== l.End) {
            const nextNode = cur.next.expect('EventEmitter$_emit')
    
            try {
                const returned = cur.handler.unwrap().apply(this.thisArg, args)
                if (this.captureRejections && returned instanceof Promise) {
                    returned.catch(reason => this._emitError(reason))
                }
            } catch (err) {
                if (type === 'error') {
                    throw err
                } else {
                    this._emitError(err)
                }
            }

            cur = nextNode
        }

        this.thisArg = ctx
    }

    private _emitError(err: any) {
        const size = this.listenerCount('error')

        if (size > 0) {
            try {
                this._emit('error', true, err)
            } catch (err) {
                throw err
            }
            return
        }

        throw err
    }

    emit(type: EventType, ...args: any[]): void {
        this._emit(type, false, ...args)
    }


    emitNone(type: EventType, ...args: any[]): void {
        this._emit(type, true, ...args)
    }


    once(type: EventType, handler: EventHandler): EventEmitter {
        this._addListener(type, handler, false, true)

        return this
    }


    prependOnceListener(type: EventType, handler: EventHandler): EventEmitter {
        this._addListener(type, handler, true, true)

        return this
    }


    listenerCount(type: EventType): number {
        return this._getEventLinked(type).size() 
    }


    listeners(type: EventType): EventHandler[] {
        const ev = this._getEventLinked(type)
        const listeners: Listener[] = []

        let cur = ev.Entry.next.unwrap()
        while (cur !== ev.End) {
            listeners.push(cur.handler.unwrap())
        }

        return listeners
    }


    rawListeners(type: EventType): EventHandler[] {
        const ev = this._getEventLinked(type)
        const listeners: Listener[] = []

        let cur = ev.Entry.next.unwrap()
        while (cur !== ev.End) {
            try {
                listeners.push(cur.raw.unwrap())
            } catch (_) {
                listeners.push(cur.handler.unwrap())
            }
        }

        return listeners
    }


    eventNames(): EventType[] {
        return Reflect.ownKeys(this._events)
    }

    constructor(opt?: EventEmitterOptions) {
        if (opt) {
            this.captureRejections = opt.captureRejections || false
            this.thisArg = opt.thisArg || {}
        }
    }
}