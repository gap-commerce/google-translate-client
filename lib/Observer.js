const Observer = class {
    constructor(callback) {
        this.observer = new MutationObserver(callback);
    }

    observe(target) {
        const config = { subtree: true, childList: true };

        this.observer.observe(target, config);
    }

    clear() {
        return this.observer.takeRecords();
    }

    disconnect() {
        this.observer.disconnect();
    }
};

export default Observer;
