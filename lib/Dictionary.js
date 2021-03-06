const Dictionary = class {
    constructor() {
        this.version = 0.1;

        this.key = `gc-translator-observer-v${this.version}`;
    }

    fetch(from, to, contents) {
        const storage = this.getStorage(from, to);

        const index = storage[0];

        if (index === -1) return [];

        const dict = [];

        contents.forEach(content => {
            let translation = storage[1][index].translations.find(
                el => el[0] === content
            );

            if (!translation) return;

            dict.push(translation);
        });

        return dict;
    }

    isReverse(from, to, entry) {
        return entry && entry.from === to && entry.to === from;
    }

    getStorage(from, to) {
        let storage = localStorage.getItem(this.key);

        !storage && (storage = "[]");

        storage = JSON.parse(storage);

        let index = storage.findIndex(
            entry =>
                (entry.from === from && entry.to === to) ||
                (entry.to === from && entry.from === to)
        );

        const reverse = this.isReverse(from, to, storage[index]);

        if (reverse) {
            storage[index] = {
                from: to,
                to: from,
                translations: storage[index].translations.map(translation =>
                    translation.reverse()
                )
            };
        }

        return [index, storage];
    }

    setStorage(from, to, translations) {
        let storage = this.getStorage(from, to);

        const entry = { from, to, translations };

        const index = storage[0];

        storage = storage[1];

        index === -1 && storage.push(entry);

        index > -1 && (storage[index] = entry);

        storage = JSON.stringify(storage);

        localStorage.setItem(this.key, storage);
    }
};

export default Dictionary;
