import Dictionary from "./Dictionary";

const Translator = class {
    constructor(from, to, key) {
        this.from = from;

        this.to = to;

        this.key = key;

        this.dictionary = new Dictionary();
    }

    api(q) {
        const url = `https://translation.googleapis.com/language/translate/v2?key=${this.key}`;

        const options = {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                source: this.from,
                target: this.to,
                format: "text",
                q
            })
        };

        const call = fetch(url, options)
            .then(response => response.json())
            .catch(e => {
                console.error("TranslatorObserver error:", e.message);

                return { data: { translations: [] } };
            })
            .then(result => result.data.translations);

        return call;
    }

    translate(contents) {
        const size = 128;

        let matchs = this.dictionary.fetch(this.from, this.to, contents);

        const diff = [];

        contents.forEach(content => {
            const translation = matchs.find(match => match[0] === content);

            !translation && diff.push(content);
        });

        if (!diff.length) {
            return new Promise(resolve => resolve(matchs));
        }

        const calls = [];

        const parts = Math.ceil(diff.length / size);

        for (let i = 0; i < parts; i++) {
            const jump = i * size;

            const group = diff.slice(jump, jump + size);

            const call = this.api(group);

            calls.push(call);
        }

        return Promise.all(calls).then(resps => {
            const entries = [];

            resps.forEach((resp, i) => {
                resp.forEach((translation, j) => {
                    const entry = [
                        diff[i * size + j],
                        translation.translatedText
                    ];

                    entries.push(entry);
                });
            });

            this.updateDict(entries);

            return matchs.concat(entries);
        });
    }

    updateDict(entries) {
        let translations = entries;

        const dict = this.dictionary.getStorage(this.from, this.to);

        const index = dict[0];

        index > -1 &&
            (translations = translations.concat(dict[1][index].translations));

        this.dictionary.setStorage(this.from, this.to, translations);
    }
};

export default Translator;
