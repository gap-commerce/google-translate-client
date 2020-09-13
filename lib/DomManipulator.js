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
                let text = node.textContent;

                text = text.replace(/\n|\t/g, "");

                text = text.replace(/  +/g, " ");

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

        return this.content.join(this.separator);
    }

    merge(result) {
        const content = result.split(this.separator);

        console.log("THIS.CONTENT", this.content);
        console.log("CONTENT", content);

        this.targets.forEach(target => {
            this.forEachTextChild(target, ({ node, text }) => {
                const index = this.content.findIndex(entry => entry === text);

                index > -1 && (node.textContent = content[index]);

                console.log(
                    "CONTENT",
                    content[index],
                    "NODE",
                    text,
                    "INDEX",
                    index
                );
            });
        });

        this.content = [];
    }
};

export default DomManipulator;
