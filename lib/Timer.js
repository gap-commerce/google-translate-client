const Timer = class {
    constructor(callback, delay) {
        this.callback = callback;

        this.delay = delay;
    }

    reset() {
        this.timer && clearTimeout(this.timer);

        this.timer = setTimeout(this.callback, this.delay);
    }
};

export default Timer;
