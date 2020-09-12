import Observer from "./Observer";
import Translator from "./Translator";
import DomManipulator from "./DomManipulator";

class TranslatorObserver {
    constructor(options) {
        this.isActive = false;

        this.target = document.getElementById(options.target);

        this.observer = new Observer(this.handleChanges());

        this.translator = new Translator(options.from, options.to, options.key);
    }

    start() {
        if (this.isActive) return;

        this.translate([this.target], () => {
            this.observer.observe(this.target);
        });

        this.isActive = true;
    }

    stop() {
        this.observer.disconnect();

        this.isActive = false;
    }

    translate(targets, callback) {
        const manipulator = new DomManipulator(targets);

        const content = manipulator.prepare();

        console.log(content);

        this.translator.translate(content).then(result => {
            manipulator.merge(result);

            callback && callback(result);
        });
    }

    handleChanges() {
        const that = this;

        return function(changesList) {
            const targets = changesList.map(change => change.target);

            that.translate(targets);
        };
    }
}

export default TranslatorObserver;
