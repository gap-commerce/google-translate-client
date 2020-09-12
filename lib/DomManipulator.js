import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
    "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ",
    7
);

const DomManipulator = class {
    constructor(targets) {
        this.targets = targets;
    }

    forEachChild(target, callback) {
        target.childNodes.forEach(node => {
            callback(node);

            this.forEachChild(node, callback);
        });
    }

    prepare() {
        this.targets.forEach(target => {
            this.forEachChild(target, node => {
                const isText =
                    node.nodeName === "#text" &&
                    node.parentNode.nodeName !== "SCRIPT";

                if (!isText) return;

                const text = node.textContent.replace(/\n|\t/g, "");

                if (text.trim() === "") return;

                const flag = document.createComment(`&${nanoid()}&`);

                node.parentNode.insertBefore(flag, node);
            });
        });

        return this.targets.map(target => target.innerHTML);
    }

    merge(results) {
        results.forEach((result, i) => {
            const parent = document.createElement("div");

            parent.innerHTML = result;

            const target = this.targets[i];

            this.forEachChild(parent, node => {
                const isText = node.nodeName === "DATALANG";

                if (!isText) return;

                const text = target.querySelector(`#${node.id}`);

                const textEl = document.createTextNode(node.textContent);

                text.parentNode.replaceChild(textEl, node);

                console.log(text, node.id);
            });
        });
    }
};

export default DomManipulator;

// update(targets, results) {
//     const replace = (source, target) => {
//         target.childNodes.forEach((node, i) => {
//             const sourceNode = source.childNodes.item(i);
//             // console.log("NODE", node, "SOURCE:", sourceNode);

//             const isText = node.nodeName === "#text";

//             // isText && (node.textContent = sourceNode.textContent);

//             !isText && replace(sourceNode, node);
//         });
//     };

//     results.forEach((result, i) => {
//         const parent = document.createElement("div");

//         let a = new DOMParser();

//         a = a.parseFromString(result, "text/html");

//         parent.innerHTML = result;

//         // replace(parent, targets[i]);

//         console.log(parent.childNodes, targets[0].replace(/\n|\t/g, " "));
//     });
//     // this.observer.clear();
// }
