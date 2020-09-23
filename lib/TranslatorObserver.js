import Observer from "./Observer";
import Translator from "./Translator";
import Timer from "./Timer";
import DomManipulator from "./DomManipulator";

class TranslatorObserver {
    constructor(options) {
        this.isActive = false;

        this.target = document.getElementById(options.target);

        this.observer = new Observer(this.handleChanges());

        this.translator = new Translator(options.from, options.to, options.key);

        this.timer = new Timer(this.dispatch(), 3000);

        this.queue = [];
    }

    start() {
        if (this.isActive) return;

        this.observer.observe(this.target);

        this.translate([this.target]);

        this.isActive = true;
    }

    stop() {
        if (!this.isActive) return;

        this.observer.disconnect();

        this.isActive = false;
    }

    translate(targets) {
        const manipulator = new DomManipulator();

        const contents = manipulator.prepare(targets);

        if (!contents.length) return;

        this.translator
            .translate(contents)
            .then(dictionary => manipulator.merge(dictionary, this.target));
    }

    handleChanges() {
        const that = this;

        return changes => {
            const targets = changes.map(change => change.target);

            // TODO: Make this array to contains unique references.
            that.queue = that.queue.concat(targets);

            that.timer.reset();
        };
    }

    dispatch() {
        const that = this;

        return () => {
            console.log("DISPATCHED", this.queue);

            that.translate(this.queue);

            this.queue = [];
        };
    }
}

export default TranslatorObserver;
