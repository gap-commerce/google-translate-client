const Observer = class {
    constructor(target, handler) {
        this.queue = [];

        this.target = target;

        this.handler = handler;

        this.observer = new MutationObserver(this.dispatch());
    }

    start() {
        const config = { subtree: true, childList: true };

        this.observer.observe(this.target, config);
    }

    stop() {
        this.observer.takeRecords();

        this.observer.disconnect();

        this.timer && clearTimeout(this.timer);

        this.queue = [];
    }

    dispatch() {
        const that = this;

        return changes => {
            const targets = changes.map(change => change.target);

            targets.forEach(target => {
                const exist = that.queue.some(el => el === target);

                if (!exist) {
                    that.queue.push(target);
                }
            });

            that.reset();
        };
    }

    reset() {
        this.timer && clearTimeout(this.timer);

        this.timer = setTimeout(() => {
            this.handler(this.queue);

            this.queue = [];
        }, 2000);
    }
};

export default Observer;
