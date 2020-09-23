const Translator = class {
    constructor(from, to, key) {
        this.dictionary = {};

        this.from = from;

        this.to = to;

        this.key = key;
    }

    match(contents) {
        const matches = {};

        contents.forEach(content => {
            const match = this.dictionary[content];

            match && (matches[content] = match);
        });

        return matches;
    }

    callGoogleApi(q) {
        const url = `https://translation.googleapis.com/language/translate/v2?key=${this.key}`;

        const options = {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                source: this.from || undefined,
                target: this.to,
                format: "text",
                q
            })
        };

        return fetch(url, options)
            .then(response => response.json())
            .then(result => result.data.translations[0].translatedText);
    }

    translate(contents) {
        const match = this.match(contents);

        const previous = Object.values(this.dictionary);

        const unmatched = contents.filter(
            content => !match[content] && !previous.includes(content)
        );

        if (!unmatched.length) {
            return new Promise(resolve => resolve(match));
        }

        const text = unmatched.join("{%}");

        const translation = this.callGoogleApi(text);

        return translation
            .then(result => result.split(/ *\{ ?% ?\} */g))
            .then(texts => {
                unmatched.forEach((content, i) => {
                    match[content] = texts[i];

                    this.dictionary[content] = texts[i];
                });

                return match;
            });
    }
};

export default Translator;
