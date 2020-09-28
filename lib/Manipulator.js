const Manipulator = class {
    constructor(target) {
        this.target = target;
    }

    forEach(target, callback) {
        const banned = ["SCRIPT", "NOSCRIPT", "IFRAME"];

        target.childNodes.forEach(node => {
            const parent = node.parentNode;

            if (banned.includes(parent.nodeName)) return;

            if (parent.getAttribute("data-to-skip")) return;

            if (node.nodeName === "#text") {
                let text = node.textContent;

                text = text.replace(/\n|\t/g, "");

                text = text.replace(/  +/g, " ");

                text = text.trim();

                !/^(|[\W\d]+)$/g.test(text) && callback({ node, text });
            } else {
                this.forEach(node, callback);
            }
        });
    }

    prepare(targets) {
        const contents = [];

        targets.forEach(target => {
            this.forEach(target, ({ text }) => {
                if (contents.some(el => el === text)) return;

                contents.push(text);
            });
        });

        return contents;
    }

    apply(dict) {
        if (!dict.length) return;

        this.forEach(this.target, ({ node, text }) => {
            const match = dict.find(entry => entry[0] === text);

            if (!match) return;

            const translation = node.textContent.replace(text, match[1]);

            node.textContent = translation;
        });
    }
};

export default Manipulator;
