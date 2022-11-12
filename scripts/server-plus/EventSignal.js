export default class EventSignal {
    listeners = new Set();
    subscribe(listener) {
        this.listeners.add(listener);
        return listener;
    }
    unsubscribe(listener) {
        this.listeners.delete(listener);
    }
    trigger(ev) {
        this.listeners.forEach((listener) => listener(ev));
    }
}
