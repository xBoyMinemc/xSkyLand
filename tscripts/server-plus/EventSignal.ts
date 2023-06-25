export default class EventSignal<T> {
    listeners = new Set()
    subscribe(listener : (arg:T) => void) {
        this.listeners.add(listener)
        return listener
    }
    unsubscribe(listener: (arg:T) => void) {
        this.listeners.delete(listener)
    }
    trigger(ev: T) {
        this.listeners.forEach((listener: Function) => listener(ev))
    }
}
