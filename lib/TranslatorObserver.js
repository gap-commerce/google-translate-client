import Observer from "./Observer";
import Translator from "./Translator";

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
        const contents = targets.map(target => target.innerHTML);

        this.translator.translate(contents).then(result => {
            targets.forEach((target, i) => {
                target.innerHTML = result[i];
            });

            this.observer.clear();

            callback && callback(result);
        });
    }

    handleChanges() {
        const that = this;

        return function(changesList) {
            const targets = changesList.map(change => change.target);

            that.translate(targets, null);
        };
    }
}

export default TranslatorObserver;
