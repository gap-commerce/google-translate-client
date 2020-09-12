const DomManipulator = class {
    constructor(targets) {
        this.targets = targets;

        this.separator = "{%}";

        this.content = [];
    }

    forEachTextChild(target, callback) {
        target.childNodes.forEach(node => {
            const parent = node.parentNode;

            const isText =
                node.nodeName === "#text" && parent.nodeName !== "SCRIPT";

            !isText && this.forEachTextChild(node, callback);

            if (isText) {
                const text = node.textContent.replace(/\n|\t/g, "");

                text.trim() !== "" && callback({ node, text });
            }
        });
    }

    prepare() {
        this.targets.forEach(target => {
            this.forEachTextChild(target, ({ text }) => {
                if (this.content.some(el => el === text)) return;

                this.content.push(text);
            });
        });

        console.log(this.content);

        return this.content.join(this.separator);
    }

    merge(result) {
        const content = result.split(this.separator);

        this.targets.forEach(target => {
            this.forEachTextChild(target, ({ node, text }) => {
                const index = this.content.findIndex(entry => entry === text);

                node.textContent = content[index];
            });
        });

        this.content = [];
    }
};

export default DomManipulator;
