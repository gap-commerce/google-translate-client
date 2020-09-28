import Observer from "./Observer";
import Translator from "./Translator";
import Manipulator from "./Manipulator";

const TranslatorObserver = class {
    constructor(options) {
        this.isActive = false;

        this.target = document.getElementById(options.target);

        this.observer = new Observer(this.target, this.handler());

        this.translator = new Translator(options.from, options.to, options.key);

        this.manipulator = new Manipulator(this.target);
    }

    start() {
        if (this.isActive) return;

        this.observer.start();

        this.translate([this.target]);

        this.isActive = true;
    }

    stop() {
        if (!this.isActive) return;

        this.observer.stop();

        this.isActive = false;
    }

    translate(targets) {
        const contents = this.manipulator.prepare(targets);

        if (!contents.length) return;

        const translation = this.translator.translate(contents);

        translation.then(dict => this.manipulator.apply(dict));
    }

    setLangs(from, to) {
        this.stop();

        this.translate.from = from;

        this.translate.to = to;

        this.start();
    }

    handler() {
        const that = this;

        return targets => that.translate(targets);
    }
};

export default TranslatorObserver;
