const DomManipulator = class {
    forEachTextChild(target, callback) {
        target.childNodes.forEach(node => {
            const parent = node.parentNode;

            const banned = ["SCRIPT", "NOSCRIPT", "IFRAME"];

            const isText =
                node.nodeName === "#text" &&
                !banned.includes(parent.nodeName) &&
                !parent.getAttribute("data-to-skip");

            !isText && this.forEachTextChild(node, callback);

            if (isText) {
                let text = node.textContent;

                text = text.replace(/\n|\t/g, "");

                text = text.replace(/  +/g, " ");

                text = text.trim();

                !/^([\W\d]+|\s+|)$/g.test(text) && callback(node, text);
            }
        });
    }

    prepare(targets) {
        const contents = [];

        targets.forEach(target => {
            this.forEachTextChild(target, (node, text) => {
                if (contents.some(el => el === text)) return;

                contents.push(text);
            });
        });

        return contents;
    }

    merge(dictionary, target) {
        this.forEachTextChild(target, (node, text) => {
            const match = dictionary[text];

            match && (node.textContent = node.textContent.replace(text, match));
        });
    }
};

export default DomManipulator;
