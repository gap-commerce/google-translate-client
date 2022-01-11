/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./lib/Observer.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Observer = /*#__PURE__*/function () {
  function Observer(target, handler) {
    _classCallCheck(this, Observer);

    this.queue = [];
    this.target = target;
    this.handler = handler;
    this.observer = new MutationObserver(this.dispatch());
  }

  _createClass(Observer, [{
    key: "start",
    value: function start() {
      var config = {
        subtree: true,
        childList: true
      };
      this.observer.observe(this.target, config);
    }
  }, {
    key: "stop",
    value: function stop() {
      this.observer.takeRecords();
      this.observer.disconnect();
      this.timer && clearTimeout(this.timer);
      this.queue = [];
    }
  }, {
    key: "dispatch",
    value: function dispatch() {
      var that = this;
      return function (changes) {
        var targets = changes.map(function (change) {
          return change.target;
        });
        targets.forEach(function (target) {
          var exist = that.queue.some(function (el) {
            return el === target;
          });

          if (!exist) {
            that.queue.push(target);
          }
        });
        that.reset();
      };
    }
  }, {
    key: "reset",
    value: function reset() {
      var _this = this;

      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        _this.handler(_this.queue);

        _this.queue = [];
      }, 2000);
    }
  }]);

  return Observer;
}();

/* harmony default export */ var lib_Observer = (Observer);
// CONCATENATED MODULE: ./lib/Dictionary.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Dictionary_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Dictionary_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Dictionary_createClass(Constructor, protoProps, staticProps) { if (protoProps) Dictionary_defineProperties(Constructor.prototype, protoProps); if (staticProps) Dictionary_defineProperties(Constructor, staticProps); return Constructor; }

var Dictionary = /*#__PURE__*/function () {
  function Dictionary() {
    Dictionary_classCallCheck(this, Dictionary);

    this.version = 0.1;
    this.key = "gc-translator-observer-v".concat(this.version);
    this.init();
  }

  Dictionary_createClass(Dictionary, [{
    key: "mergeStorages",
    value: function mergeStorages(local, cloud) {
      var mergedStorage = []; // merge equals keys

      local.forEach(function (itemL) {
        var itemC = cloud.find(function (el) {
          return el.from === itemL.from && el.to === itemL.to;
        });

        if (itemC) {
          var transLDiffTransC = itemL.translations.filter(function (transL) {
            return itemC.translations.findIndex(function (transC) {
              return transC[0] === transL[0];
            }) === -1;
          });
          var mergedTranslations = transLDiffTransC.concat(itemC.translations);
          mergedStorage.push({
            "from": itemL.from,
            "to": itemL.to,
            "translations": mergedTranslations
          });
        }
      });
      var localDiffCloud = local.filter(function (localItem) {
        return cloud.findIndex(function (cloudItem) {
          return localItem.from === cloudItem.from && localItem.to === cloudItem.to;
        }) === -1;
      });
      var cloudDiffLocal = cloud.filter(function (cloudItem) {
        return local.findIndex(function (localItem) {
          return localItem.from === cloudItem.from && localItem.to === cloudItem.to;
        }) === -1;
      }); // merge different keys

      mergedStorage.push.apply(mergedStorage, _toConsumableArray(localDiffCloud.concat(cloudDiffLocal)));
      return mergedStorage;
    }
  }, {
    key: "fetchCloudStored",
    value: function fetchCloudStored() {
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
      var storedTrans = [{
        "from": "en",
        "to": "es",
        "translations": [["The content did change.", "El contenido cambió."], ["Now we have different subtree.", "Ahora tenemos un subárbol diferente."], ["And it works!", "¡Y funciona!"], ["TranslatorObserver example", "Ejemplo de TranslatorObserver"], ["From", "Desde"], ["Autodetect", "Detección automática"], ["Spanish", "español"], ["English", "inglés"], ["To", "A"], ["Stop", "Detener"], ["This content may change if you click in the bottom below.", "Este contenido puede cambiar si hace clic en la parte inferior a continuación."], ["It will be translated automatically while translation is running.", "Se traducirá automáticamente mientras se ejecuta la traducción."], ["Change", "Cambio"]]
      }];
      return storedTrans;
    }
  }, {
    key: "init",
    value: function init() {
      var storageLocal = localStorage.getItem(this.key);
      !storageLocal && (storageLocal = "[]");
      storageLocal = JSON.parse(storageLocal);
      var storageCloud = this.fetchCloudStored(); // storageCloud.then(); // todo use Promises syntax and replace code below

      storageLocal = this.mergeStorages(storageLocal, storageCloud);
      storageLocal = JSON.stringify(storageLocal);
      localStorage.setItem(this.key, storageLocal);
    }
  }, {
    key: "fetch",
    value: function fetch(from, to, contents) {
      var storage = this.getStorage(from, to);
      var index = storage[0];
      if (index === -1) return [];
      var dict = [];
      contents.forEach(function (content) {
        var translation = storage[1][index].translations.find(function (el) {
          return el[0] === content;
        });
        if (!translation) return;
        dict.push(translation);
      });
      return dict;
    }
  }, {
    key: "isReverse",
    value: function isReverse(from, to, entry) {
      return entry && entry.from === to && entry.to === from;
    }
  }, {
    key: "getStorage",
    value: function getStorage(from, to) {
      var storage = localStorage.getItem(this.key);
      !storage && (storage = "[]");
      storage = JSON.parse(storage);
      var index = storage.findIndex(function (entry) {
        return entry.from === from && entry.to === to || entry.to === from && entry.from === to;
      });
      var reverse = this.isReverse(from, to, storage[index]);

      if (reverse) {
        storage[index] = {
          from: to,
          to: from,
          translations: storage[index].translations.map(function (translation) {
            return translation.reverse();
          })
        };
      }

      return [index, storage];
    }
  }, {
    key: "setStorage",
    value: function setStorage(from, to, translations) {
      var storage = this.getStorage(from, to);
      var entry = {
        from: from,
        to: to,
        translations: translations
      };
      var index = storage[0];
      storage = storage[1];
      index === -1 && storage.push(entry);
      index > -1 && (storage[index] = entry);
      storage = JSON.stringify(storage);
      localStorage.setItem(this.key, storage);
    }
  }]);

  return Dictionary;
}();

/* harmony default export */ var lib_Dictionary = (Dictionary); // const dict = new Dictionary();
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
// CONCATENATED MODULE: ./lib/Translator.js
function Translator_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Translator_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Translator_createClass(Constructor, protoProps, staticProps) { if (protoProps) Translator_defineProperties(Constructor.prototype, protoProps); if (staticProps) Translator_defineProperties(Constructor, staticProps); return Constructor; }



var Translator_Translator = /*#__PURE__*/function () {
  function Translator(from, to, key) {
    Translator_classCallCheck(this, Translator);

    this.from = from;
    this.to = to;
    this.key = key;
    this.dictionary = new lib_Dictionary();
  }

  Translator_createClass(Translator, [{
    key: "api",
    value: function api(q) {
      var url = "https://translation.googleapis.com/language/translate/v2?key=".concat(this.key);
      var options = {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          source: this.from,
          target: this.to,
          format: "text",
          q: q
        })
      };
      var call = fetch(url, options).then(function (response) {
        return response.json();
      })["catch"](function (e) {
        console.error("TranslatorObserver error:", e.message);
        return {
          data: {
            translations: []
          }
        };
      }).then(function (result) {
        return result.data.translations;
      });
      return call;
    }
  }, {
    key: "translate",
    value: function translate(contents) {
      var _this = this;

      var size = 128;
      var matchs = this.dictionary.fetch(this.from, this.to, contents);
      var diff = [];
      contents.forEach(function (content) {
        var translation = matchs.find(function (match) {
          return match[0] === content;
        });
        !translation && diff.push(content);
      });

      if (!diff.length) {
        return new Promise(function (resolve) {
          return resolve(matchs);
        });
      }

      var calls = [];
      var parts = Math.ceil(diff.length / size);

      for (var i = 0; i < parts; i++) {
        var jump = i * size;
        var group = diff.slice(jump, jump + size);
        var call = this.api(group);
        calls.push(call);
      }

      return Promise.all(calls).then(function (resps) {
        var entries = [];
        resps.forEach(function (resp, i) {
          resp.forEach(function (translation, j) {
            var entry = [diff[i * size + j], translation.translatedText];
            entries.push(entry);
          });
        });

        _this.updateDict(entries);

        return matchs.concat(entries);
      });
    }
  }, {
    key: "updateDict",
    value: function updateDict(entries) {
      var translations = entries;
      var dict = this.dictionary.getStorage(this.from, this.to);
      var index = dict[0];
      index > -1 && (translations = translations.concat(dict[1][index].translations));
      this.dictionary.setStorage(this.from, this.to, translations);
    }
  }]);

  return Translator;
}();

/* harmony default export */ var lib_Translator = (Translator_Translator);
// CONCATENATED MODULE: ./lib/Manipulator.js
function Manipulator_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Manipulator_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Manipulator_createClass(Constructor, protoProps, staticProps) { if (protoProps) Manipulator_defineProperties(Constructor.prototype, protoProps); if (staticProps) Manipulator_defineProperties(Constructor, staticProps); return Constructor; }

var Manipulator = /*#__PURE__*/function () {
  function Manipulator(target) {
    Manipulator_classCallCheck(this, Manipulator);

    this.target = target;
  }

  Manipulator_createClass(Manipulator, [{
    key: "forEach",
    value: function forEach(target, callback) {
      var _this = this;

      var banned = ["SCRIPT", "NOSCRIPT", "IFRAME"];
      target.childNodes.forEach(function (node) {
        var parent = node.parentNode;
        if (banned.includes(parent.nodeName)) return;
        if (parent.getAttribute("data-to-skip")) return;

        if (node.nodeName === "#text") {
          var text = node.textContent;
          text = text.replace(/\n|\t/g, "");
          text = text.replace(/  +/g, " ");
          text = text.trim();
          !/^(|[\W\d]+)$/g.test(text) && callback({
            node: node,
            text: text
          });
        } else {
          _this.forEach(node, callback);
        }
      });
    }
  }, {
    key: "prepare",
    value: function prepare(targets) {
      var _this2 = this;

      var contents = [];
      targets.forEach(function (target) {
        _this2.forEach(target, function (_ref) {
          var text = _ref.text;
          if (contents.some(function (el) {
            return el === text;
          })) return;
          contents.push(text);
        });
      });
      return contents;
    }
  }, {
    key: "apply",
    value: function apply(dict) {
      if (!dict.length) return;
      this.forEach(this.target, function (_ref2) {
        var node = _ref2.node,
            text = _ref2.text;
        var match = dict.find(function (entry) {
          return entry[0] === text;
        });
        if (!match) return;
        var translation = node.textContent.replace(text, match[1]);
        node.textContent = translation;
      });
    }
  }]);

  return Manipulator;
}();

/* harmony default export */ var lib_Manipulator = (Manipulator);
// CONCATENATED MODULE: ./lib/TranslatorObserver.js
function TranslatorObserver_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function TranslatorObserver_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function TranslatorObserver_createClass(Constructor, protoProps, staticProps) { if (protoProps) TranslatorObserver_defineProperties(Constructor.prototype, protoProps); if (staticProps) TranslatorObserver_defineProperties(Constructor, staticProps); return Constructor; }





var TranslatorObserver_TranslatorObserver = /*#__PURE__*/function () {
  function TranslatorObserver(options) {
    TranslatorObserver_classCallCheck(this, TranslatorObserver);

    this.isActive = false;
    this.target = document.getElementById(options.target);
    this.observer = new lib_Observer(this.target, this.handler());
    this.translator = new lib_Translator(options.from, options.to, options.key);
    this.manipulator = new lib_Manipulator(this.target);
  }

  TranslatorObserver_createClass(TranslatorObserver, [{
    key: "start",
    value: function start() {
      if (this.isActive) return;
      this.observer.start();
      this.translate([this.target]);
      this.isActive = true;
    }
  }, {
    key: "stop",
    value: function stop() {
      if (!this.isActive) return;
      this.observer.stop();
      this.isActive = false;
    }
  }, {
    key: "translate",
    value: function translate(targets) {
      var _this = this;

      var contents = this.manipulator.prepare(targets);
      if (!contents.length) return;
      var translation = this.translator.translate(contents);
      translation.then(function (dict) {
        return _this.manipulator.apply(dict);
      });
    }
  }, {
    key: "setLangs",
    value: function setLangs(from, to) {
      this.stop();
      this.translate.from = from;
      this.translate.to = to;
      this.start();
    }
  }, {
    key: "handler",
    value: function handler() {
      var that = this;
      return function (targets) {
        return that.translate(targets);
      };
    }
  }]);

  return TranslatorObserver;
}();

/* harmony default export */ var lib_TranslatorObserver = (TranslatorObserver_TranslatorObserver);
// CONCATENATED MODULE: ./index.js

window.TranslatorObserver = lib_TranslatorObserver;
/* harmony default export */ var index = __webpack_exports__["default"] = (lib_TranslatorObserver);

/***/ })
/******/ ]);