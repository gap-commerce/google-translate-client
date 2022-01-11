const Dictionary = class {
    constructor() {
        this.version = 0.1;

        this.key = `gc-translator-observer-v${this.version}`;

        this.init();
    }

    mergeStorages(local, cloud) {
        const mergedStorage = [];
        // merge equals keys
        local.forEach((itemL) => {
            const itemC = cloud.find((el) => el.from === itemL.from && el.to === itemL.to);
            if (itemC){
                const transLDiffTransC = itemL.translations.filter((transL) => itemC.translations.findIndex((transC) => transC[0] === transL[0]) === -1);
                const mergedTranslations = transLDiffTransC.concat(itemC.translations);
                mergedStorage.push({"from": itemL.from, "to": itemL.to, "translations": mergedTranslations});
            }
        })

        const localDiffCloud = local.filter(
            (localItem) => cloud.findIndex((cloudItem) => localItem.from === cloudItem.from && localItem.to === cloudItem.to) === -1
        );
        const cloudDiffLocal = cloud.filter(
            (cloudItem) => local.findIndex((localItem) => localItem.from === cloudItem.from && localItem.to === cloudItem.to) === -1
        );
        // merge different keys
        mergedStorage.push( ...localDiffCloud.concat(cloudDiffLocal) );

        return mergedStorage;

    }

    fetchCloudStored() {
        // url = `https://stored.tranlations.api`; // todo define api url
        //const call = fetch(url)
        //       .then(response => response.json())
        //       .catch(e => {
        //         console.error("Dictionary error:", e.message);
        //         return {data: []};
        //       })
        //       .then(result => result.data); // todo define structure of returned data
        //
        // return call;

        return [
            {
                "from": "en",
                "to": "es",
                "translations": [
                    ["The content did change.", "El contenido cambió."],
                    ["Now we have different subtree.", "Ahora tenemos un subárbol diferente."],
                    ["And it works!", "¡Y funciona!"],
                    ["TranslatorObserver example", "Ejemplo de TranslatorObserver"],
                    ["From", "Desde"],
                    ["Autodetect", "Detección automática"],
                    ["Spanish", "español"],
                    ["English", "inglés"],
                    ["To", "A"],
                    ["Stop", "Detener"],
                    ["This content may change if you click in the bottom below.", "Este contenido puede cambiar si hace clic en la parte inferior a continuación."],
                    ["It will be translated automatically while translation is running.", "Se traducirá automáticamente mientras se ejecuta la traducción."],
                    ["Change", "Cambio"]]
            },
        ];
    }

    init() {
        let storageLocal = localStorage.getItem(this.key);
        !storageLocal && (storageLocal = "[]");
        storageLocal = JSON.parse(storageLocal);

        const storageCloud = this.fetchCloudStored();

        // storageCloud.then(); // todo use Promises syntax and replace code below
        storageLocal = this.mergeStorages(storageLocal, storageCloud);
        storageLocal = JSON.stringify(storageLocal);
        localStorage.setItem(this.key, storageLocal);
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

        const entry = {from, to, translations};

        const index = storage[0];

        storage = storage[1];

        index === -1 && storage.push(entry);

        index > -1 && (storage[index] = entry);

        storage = JSON.stringify(storage);

        localStorage.setItem(this.key, storage);
    }
};

export default Dictionary;

// const dict = new Dictionary();
// const str1 = [
//     {
//         "from": "en",
//         "to": "es",
//         "translations": [
//             ["Autodetect", "Detección automática"],
//             ["Spanish", "español"],
//             ["English", "inglés"],
//             ["To", "A"],
//             ["Stop", "Detener"],
//             ["This content may change if you click in the bottom below.", "Este contenido puede cambiar si hace clic en la parte inferior a continuación."],
//             ["It will be translated automatically while translation is running.", "Se traducirá automáticamente mientras se ejecuta la traducción."],
//             ["Change", "Cambio"]]
//     },
//     {
//         "from": "jp",
//         "to": "es",
//         "translations": [
//             ["The content did change.", "El contenido cambió."],
//             ["Now we have different subtree.", "Ahora tenemos un subárbol diferente."],
//             ["And it works!", "¡Y funciona!"],
//             ["TranslatorObserver example", "Ejemplo de TranslatorObserver"],
//             ["From", "Desde"],
//         ]
//     },
// ];
//
// const str2 = [
//     {
//         "from": "en",
//         "to": "es",
//         "translations": [
//             ["The content did change.", "El contenido cambió."],
//             ["Now we have different subtree.", "Ahora tenemos un subárbol diferente."],
//             ["And it works!", "¡Y funciona!"],
//             ["TranslatorObserver example", "Ejemplo de TranslatorObserver"],
//             ["From", "Desde"],
//         ]
//     },
// ];
// console.log(dict.mergeStorages(str1, str2));
//
// console.log(dict.mergeStorages(str2, str1));