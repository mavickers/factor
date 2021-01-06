/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Flags\": () => /* reexport safe */ _interfaces_Flags__WEBPACK_IMPORTED_MODULE_0__.default\n/* harmony export */ });\n/* harmony import */ var _interfaces_Flags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interfaces/Flags */ \"./src/interfaces/Flags.js\");\n\n\n\n//# sourceURL=webpack://@mavickers/factor/./src/index.js?");

/***/ }),

/***/ "./src/interfaces/Flags.js":
/*!*********************************!*\
  !*** ./src/interfaces/Flags.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError(\"attempted to set private field on non-instance\"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError(\"attempted to set read only private field\"); } descriptor.value = value; } return value; }\n\nfunction _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError(\"attempted to get private field on non-instance\"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }\n\nvar _value = new WeakMap();\n\nvar _validatedArgs = new WeakMap();\n\nvar Flags = /*#__PURE__*/function () {\n  function Flags() {\n    var _this2 = this;\n\n    _classCallCheck(this, Flags);\n\n    _value.set(this, {\n      writable: true,\n      value: 0\n    });\n\n    _defineProperty(this, \"clear\", function () {\n      _classPrivateFieldSet(this, _value, 0);\n\n      return this;\n    });\n\n    _defineProperty(this, \"hasAll\", function () {\n      var _classPrivateFieldGet3;\n\n      var value = _classPrivateFieldGet(this, _value);\n\n      var ctor = this.constructor;\n\n      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n\n      var _classPrivateFieldGet2 = (_classPrivateFieldGet3 = _classPrivateFieldGet(this, _validatedArgs)).call.apply(_classPrivateFieldGet3, [this].concat(args)),\n          intArgs = _classPrivateFieldGet2.intArgs,\n          stringArgs = _classPrivateFieldGet2.stringArgs;\n\n      var intArgsFound = intArgs.filter(function (arg) {\n        return (value & arg) != 0;\n      }).length;\n      var stringArgsFound = stringArgs.filter(function (arg) {\n        return (value & ctor[arg]) != 0;\n      }).length;\n      return stringArgsFound + intArgsFound === args.length;\n    });\n\n    _defineProperty(this, \"hasAny\", function () {\n      var _classPrivateFieldGet5;\n\n      var value = _classPrivateFieldGet(this, _value);\n\n      var ctor = this.constructor;\n\n      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n        args[_key2] = arguments[_key2];\n      }\n\n      var _classPrivateFieldGet4 = (_classPrivateFieldGet5 = _classPrivateFieldGet(this, _validatedArgs)).call.apply(_classPrivateFieldGet5, [this].concat(args)),\n          intArgs = _classPrivateFieldGet4.intArgs,\n          stringArgs = _classPrivateFieldGet4.stringArgs;\n\n      if (intArgs.find(function (arg) {\n        return value & arg;\n      })) return true;\n      if (stringArgs.find(function (arg) {\n        return value & ctor[arg];\n      })) return true;\n      return false;\n    });\n\n    _defineProperty(this, \"set\", function () {\n      var _classPrivateFieldGet7,\n          _this = this;\n\n      var ctor = this.constructor;\n\n      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {\n        args[_key3] = arguments[_key3];\n      }\n\n      var _classPrivateFieldGet6 = (_classPrivateFieldGet7 = _classPrivateFieldGet(this, _validatedArgs)).call.apply(_classPrivateFieldGet7, [this].concat(args)),\n          intArgs = _classPrivateFieldGet6.intArgs,\n          stringArgs = _classPrivateFieldGet6.stringArgs; // iterate through matching string and int args, bitwise-or the value\n      // onto the internal flag value\n\n\n      intArgs.forEach(function (arg) {\n        return _classPrivateFieldSet(_this, _value, _classPrivateFieldGet(_this, _value) | arg);\n      });\n      stringArgs.forEach(function (arg) {\n        return _classPrivateFieldSet(_this, _value, _classPrivateFieldGet(_this, _value) | ctor[arg]);\n      });\n      return this;\n    });\n\n    _validatedArgs.set(this, {\n      writable: true,\n      value: function value() {\n        var ctor = this.constructor;\n\n        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {\n          args[_key4] = arguments[_key4];\n        }\n\n        return {\n          intArgs: args.filter(function (arg) {\n            return Number.isInteger(arg) && ctor[\"_flags\"].map(function (flag) {\n              return ctor[flag];\n            }).includes(arg);\n          }) || [],\n          stringArgs: args.filter(function (arg) {\n            return typeof arg == \"string\" && arg.trim() && ctor[arg.trim()] && Number.isInteger(ctor[arg.trim()]);\n          }) || []\n        };\n      }\n    });\n\n    var props = Object.getOwnPropertyNames(this.constructor);\n    var blankProps = props.filter(function (prop) {\n      return _this2.constructor[prop] == undefined;\n    });\n    var power = 0;\n    var flags = []; // iterate through all the static props that have an undefined value\n\n    blankProps.forEach(function (prop) {\n      var value = Math.pow(2, power++); // remove the prop from the inheriting class...\n\n      delete _this2.constructor[prop]; // ...and add it back as a getter - we don't want to be able to\n      // mutate the value after instantiation\n\n      Object.defineProperty(_this2.constructor, prop, {\n        get: function get() {\n          return value;\n        }\n      });\n      flags.push(prop);\n    }); // take the prop names that we stored in the array and staple it as a\n    // static property to the inheriting class - we can use the array when\n    // validating arguments for flag mutation/reading; this should only happen\n    // once for each child class.\n\n    if (!props.includes(\"_flags\")) Object.defineProperty(this.constructor, \"_flags\", {\n      get: function get() {\n        return flags;\n      }\n    });\n  }\n\n  _createClass(Flags, [{\n    key: \"value\",\n    get: function get() {\n      return _classPrivateFieldGet(this, _value);\n    }\n  }]);\n\n  return Flags;\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Flags);\n\n//# sourceURL=webpack://@mavickers/factor/./src/interfaces/Flags.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;