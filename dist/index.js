/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["mavickersFactor"] = factory();
	else
		root["mavickersFactor"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/base/Classes.js":
/*!*****************************!*\
  !*** ./src/base/Classes.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* export default binding */ __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ \"core-js/modules/es.array.filter.js\");\n/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ \"core-js/modules/es.array.for-each.js\");\n/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.assign.js */ \"core-js/modules/es.object.assign.js\");\n/* harmony import */ var core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ \"core-js/modules/es.object.get-own-property-descriptor.js\");\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_object_get_own_property_names_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-names.js */ \"core-js/modules/es.object.get-own-property-names.js\");\n/* harmony import */ var core_js_modules_es_object_get_own_property_names_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_names_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ \"core-js/modules/web.dom-collections.for-each.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"@babel/runtime/helpers/classCallCheck\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\n// Classes.js\n// Mimics the ability to inherit multiple classes in js.\n// usage: class ClassName extends Classes([ Class1, Class2 ]) { }\n// lifted from: https://stackoverflow.com/questions/29879267/es6-class-multiple-inheritance\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(bases) {\n  var Bases = function Bases() {\n    var _this = this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6___default()(this, Bases);\n\n    bases.forEach(function (base) {\n      return Object.assign(_this, new base());\n    });\n  };\n\n  bases.forEach(function (base) {\n    // this copies instance properties over\n    Object.getOwnPropertyNames(base.prototype).filter(function (prop) {\n      return prop != 'constructor';\n    }).forEach(function (prop) {\n      return Object.defineProperty(Bases.prototype, prop, Object.getOwnPropertyDescriptor(base.prototype, prop));\n    }); // this copies static properties over\n\n    for (var key in base) {\n      Bases[key] = base[key];\n    }\n  });\n  return Bases;\n}\n\n//# sourceURL=webpack://mavickersFactor/./src/base/Classes.js?");

/***/ }),

/***/ "./src/base/Mapper.js":
/*!****************************!*\
  !*** ./src/base/Mapper.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ \"core-js/modules/es.array.filter.js\");\n/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ \"core-js/modules/es.array.iterator.js\");\n/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ \"core-js/modules/es.array.map.js\");\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ \"core-js/modules/es.number.constructor.js\");\n/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_number_is_integer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.number.is-integer.js */ \"core-js/modules/es.number.is-integer.js\");\n/* harmony import */ var core_js_modules_es_number_is_integer_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_is_integer_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ \"core-js/modules/es.string.iterator.js\");\n/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var core_js_modules_es_weak_map_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.weak-map.js */ \"core-js/modules/es.weak-map.js\");\n/* harmony import */ var core_js_modules_es_weak_map_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_weak_map_js__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ \"core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"@babel/runtime/helpers/classCallCheck\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"@babel/runtime/helpers/createClass\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldGet */ \"@babel/runtime/helpers/classPrivateFieldGet\");\n/* harmony import */ var _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldSet */ \"@babel/runtime/helpers/classPrivateFieldSet\");\n/* harmony import */ var _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Utilities */ \"./src/base/Utilities.js\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../index */ \"./src/index.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/*\n *  Mapper\n *\n *  Usage: Mapper\n *         .FromType(type)\n *         .ToType(type)\n *         .WithMultipleMapper(multipleMappingFn)\n *         .WithSingleMapper(singleMappingFn)\n *         .WithOption(option)\n *\n */\n\nvar _fromType = new WeakMap();\n\nvar _toType = new WeakMap();\n\nvar _multipleMapper = new WeakMap();\n\nvar _singleMapper = new WeakMap();\n\nvar _options = new WeakMap();\n\nvar Mapper = /*#__PURE__*/function () {\n  function Mapper() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_9___default()(this, Mapper);\n\n    _fromType.set(this, {\n      writable: true,\n      value: void 0\n    });\n\n    _toType.set(this, {\n      writable: true,\n      value: void 0\n    });\n\n    _multipleMapper.set(this, {\n      writable: true,\n      value: void 0\n    });\n\n    _singleMapper.set(this, {\n      writable: true,\n      value: void 0\n    });\n\n    _options.set(this, {\n      writable: true,\n      value: void 0\n    });\n\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    var funcs = args.filter(function (arg) {\n      return typeof arg === \"function\" && !_Utilities__WEBPACK_IMPORTED_MODULE_13__.default.IsClass(arg);\n    });\n    var classes = args.filter(function (arg) {\n      return _Utilities__WEBPACK_IMPORTED_MODULE_13__.default.IsClass(arg);\n    });\n    var options = args.filter(function (arg) {\n      return Number.isInteger(arg);\n    });\n    this.ToType(classes[0]).FromType(classes[1]).WithSingleMapper(funcs[0]).WithMultipleMapper(funcs[1]);\n\n    _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_12___default()(this, _options, new _index__WEBPACK_IMPORTED_MODULE_14__.MapperOptionsFlag().set(options));\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_10___default()(Mapper, [{\n    key: \"multiple\",\n    value: function multiple(items, data) {\n      var _this = this;\n\n      // if no items are passed in, return an empty array\n      if (!(items && Array.isArray(items))) return []; // first map through the single mapper\n\n      var singleMapped = _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_11___default()(this, _multipleMapper) && _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_11___default()(this, _multipleMapper).call(this, items, data) || items.map(function (item, index, array) {\n        return _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_11___default()(_this, _singleMapper).call(_this, item, index, array, data);\n      }); // then filter out null values if the NullFiltering flag is on\n\n      var nullMapped = _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_11___default()(this, _options).hasAny(_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_11___default()(this, _options).NullFiltering) && singleMapped.filter(function (item) {\n        return item != null;\n      }) || singleMapped; // lastly filter out mapped values that are not of toType, if specified\n\n      var typeMapped = _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_11___default()(this, _toType) && nullMapped.filter(function (item) {\n        return item instanceof _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_11___default()(_this, _toType);\n      }) || nullMapped;\n      return typeMapped;\n    }\n  }, {\n    key: \"single\",\n    value: function single(item, index, array, data) {\n      // if we don't have a single mapping function, throw error\n      if (!(_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_11___default()(this, _singleMapper) && _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_11___default()(this, _singleMapper) instanceof Function)) throw Error(\"Mapper does not contain a valid single() method\"); // if we don't have an item or there is a specified \"from\" type and the item\n      // is not the same type, return a null\n\n      if (!item || _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_11___default()(this, _fromType) && !item instanceof _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_11___default()(this, _fromType)) return; // run the item through the mapper\n\n      var mapped = _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_11___default()(this, _singleMapper).call(this, item, index, array, data); // if there is a \"to\" type specified and the mapped item doesn't match,\n      // set the return value to null;\n      //const typeMapped = !this.#toType && mapped || mapped instanceof this.#toType && mapped;\n\n\n      var typeMapped = _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_11___default()(this, _toType) && mapped instanceof _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_11___default()(this, _toType) && mapped || mapped;\n      return typeMapped;\n    }\n  }, {\n    key: \"FromType\",\n    value: function FromType(type) {\n      _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_12___default()(this, _fromType, _Utilities__WEBPACK_IMPORTED_MODULE_13__.default.IsClass(type) && type);\n\n      return this;\n    }\n  }, {\n    key: \"ToType\",\n    value: function ToType(type) {\n      _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_12___default()(this, _toType, _Utilities__WEBPACK_IMPORTED_MODULE_13__.default.IsClass(type) && type);\n\n      return this;\n    }\n  }, {\n    key: \"WithMultipleMapper\",\n    value: function WithMultipleMapper(multiple) {\n      _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_12___default()(this, _multipleMapper, multiple instanceof Function && multiple);\n\n      return this;\n    }\n  }, {\n    key: \"WithOption\",\n    value: function WithOption(opt) {\n      _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_11___default()(this, _options).Set(opt);\n\n      return this;\n    }\n  }, {\n    key: \"WithSingleMapper\",\n    value: function WithSingleMapper(single) {\n      _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_12___default()(this, _singleMapper, single instanceof Function && single || _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_11___default()(this, _singleMapper));\n\n      return this;\n    }\n  }, {\n    key: \"options\",\n    get: function get() {\n      return _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_11___default()(this, _options);\n    }\n  }], [{\n    key: \"FromType\",\n    value: function FromType(type) {\n      var mapper = new Mapper();\n      return mapper.FromType(type);\n    }\n  }, {\n    key: \"ToType\",\n    value: function ToType(type) {\n      var mapper = new Mapper();\n      return mapper.ToType(type);\n    }\n  }, {\n    key: \"WithMultipleMapper\",\n    value: function WithMultipleMapper(multiple) {\n      var mapper = new Mapper();\n      return mapper.WithMultipleMapper(multiple);\n    }\n  }, {\n    key: \"WithOption\",\n    value: function WithOption(opt) {\n      var mapper = new Mapper();\n      return mapper.WithOption(opt);\n    }\n  }, {\n    key: \"WithSingleMapper\",\n    value: function WithSingleMapper(single) {\n      var mapper = new Mapper();\n      return mapper.WithSingleMapper(single);\n    }\n  }]);\n\n  return Mapper;\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Mapper);\n\n//# sourceURL=webpack://mavickersFactor/./src/base/Mapper.js?");

/***/ }),

/***/ "./src/base/Utilities.js":
/*!*******************************!*\
  !*** ./src/base/Utilities.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.reduce.js */ \"core-js/modules/es.array.reduce.js\");\n/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ \"core-js/modules/es.function.name.js\");\n/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ \"core-js/modules/es.object.get-prototype-of.js\");\n/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.regexp.constructor.js */ \"core-js/modules/es.regexp.constructor.js\");\n/* harmony import */ var core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ \"core-js/modules/es.regexp.exec.js\");\n/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ \"core-js/modules/es.regexp.to-string.js\");\n/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ \"core-js/modules/es.string.replace.js\");\n/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"@babel/runtime/helpers/classCallCheck\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"@babel/runtime/helpers/createClass\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"@babel/runtime/helpers/defineProperty\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10__);\n\n\n\n\n\n\n\n\n\n\n\n\nvar Utilities = /*#__PURE__*/function () {\n  function Utilities() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_8___default()(this, Utilities);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_9___default()(Utilities, null, [{\n    key: \"GetFuncParams\",\n\n    /*\n     *  funcParams()\n     *\n     *  Returns the name of the parameters for a given function.\n     *\n     *  Stolen from https://stackoverflow.com/a/39253854/1809473\n     *\n     *  May not work properly with params that have a default value.\n     *\n     */\n    value: function GetFuncParams(func) {\n      if (!(func && func instanceof Function)) throw Error(\"Invalid param 'func' in funcParams()\");\n      return new RegExp('(?:' + func.name + '\\\\s*|^)\\\\s*\\\\((.*?)\\\\)').exec(func.toString().replace(/\\n/g, ''))[1].replace(/\\/\\*.*?\\*\\//g, '').replace(/ /g, '');\n    }\n  }]);\n\n  return Utilities;\n}();\n\n_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(Utilities, \"GetParentClassName\", function (obj) {\n  return Object.getPrototypeOf(obj.constructor).name;\n});\n\n_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(Utilities, \"IsArrayOfType\", function (obj, type) {\n  return obj && Array.isArray(obj) && obj.reduce(function (acc, col) {\n    return acc && col instanceof type;\n  }, true) || false;\n});\n\n_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(Utilities, \"IsClass\", function (obj) {\n  // if the string content of the given object satisfies any of these conditions,\n  // consider the object as a class:\n  // - string starts with \"class\" (native class declaration)\n  // - string contains \"_classCallCheck\" (babelized class)\n  // - string contains \"native code\" (native object)\n  return typeof obj === 'function' && /^\\s*class\\s+|_classCallCheck|native\\scode/.test(obj.toString());\n});\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Utilities);\n\n//# sourceURL=webpack://mavickersFactor/./src/base/Utilities.js?");

/***/ }),

/***/ "./src/base/interfaces/Describing.js":
/*!*******************************************!*\
  !*** ./src/base/interfaces/Describing.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ \"core-js/modules/es.array.filter.js\");\n/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ \"core-js/modules/es.array.for-each.js\");\n/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ \"core-js/modules/es.function.name.js\");\n/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_object_get_own_property_names_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-names.js */ \"core-js/modules/es.object.get-own-property-names.js\");\n/* harmony import */ var core_js_modules_es_object_get_own_property_names_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_names_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ \"core-js/modules/web.dom-collections.for-each.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"@babel/runtime/helpers/classCallCheck\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"@babel/runtime/helpers/createClass\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"@babel/runtime/helpers/defineProperty\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var lodash_clonedeep__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lodash.clonedeep */ \"lodash.clonedeep\");\n/* harmony import */ var lodash_clonedeep__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash_clonedeep__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var object_hash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! object-hash */ \"object-hash\");\n/* harmony import */ var object_hash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(object_hash__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Utilities */ \"./src/base/Utilities.js\");\n\n\n\n\n\n\n\n\n\n\n\n\nvar Describing = /*#__PURE__*/function () {\n  function Describing() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5___default()(this, Describing);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(Describing, [{\n    key: \"differencesFrom\",\n    value: function differencesFrom(obj) {\n      var _this = this;\n\n      var diffs = {};\n      Object.getOwnPropertyNames(this).filter(function (prop) {\n        return prop != \"constructor\" && prop != \"__ob__\" && typeof _this[prop] != \"function\" && !(_this[prop] instanceof Function);\n      }).forEach(function (prop) {\n        // if the property is an object and the hash of the property of this object is same\n        // to the hash of the property of the comparing object, the property not considered different.\n        if (_this[prop] instanceof Object && obj[prop] && object_hash__WEBPACK_IMPORTED_MODULE_9___default()(_this[prop]) == object_hash__WEBPACK_IMPORTED_MODULE_9___default()(obj[prop])) return; // if this property value is not an object and the property of this object has the same\n        // value as the property value of the comparing object the project is not considered different.\n\n        if (!(_this[prop] instanceof Object) && _this[prop] == obj[prop]) return; // it seems the property value is different, so add it to the list of different values.\n\n        diffs[prop] = obj[prop];\n      });\n      return diffs;\n    }\n  }, {\n    key: \"clone\",\n    value: function clone() {\n      return lodash_clonedeep__WEBPACK_IMPORTED_MODULE_8___default()(this);\n    }\n  }, {\n    key: \"className\",\n    get: function get() {\n      return this.__proto__.constructor.name;\n    }\n  }, {\n    key: \"hash\",\n    get: function get() {\n      return object_hash__WEBPACK_IMPORTED_MODULE_9___default()(this);\n    }\n  }]);\n\n  return Describing;\n}();\n\n_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(Describing, \"IsArrayOf\", function (obj) {\n  return _Utilities__WEBPACK_IMPORTED_MODULE_10__.default.IsArrayOfType(obj, this);\n});\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Describing);\n\n//# sourceURL=webpack://mavickersFactor/./src/base/interfaces/Describing.js?");

/***/ }),

/***/ "./src/base/interfaces/Enum.js":
/*!*************************************!*\
  !*** ./src/base/interfaces/Enum.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var core_js_modules_es_object_freeze_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.freeze.js */ \"core-js/modules/es.object.freeze.js\");\n/* harmony import */ var core_js_modules_es_object_freeze_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_freeze_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"@babel/runtime/helpers/classCallCheck\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"@babel/runtime/helpers/defineProperty\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var object_scan__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! object-scan */ \"object-scan\");\n/* harmony import */ var object_scan__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(object_scan__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nvar Enum = function Enum() {\n  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Enum);\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"ContainsValue\", function (propertyValue, singleOnly) {\n    if (propertyValue == null) return;\n    if (singleOnly == null || typeof singleOnly !== \"boolean\") singleOnly = true;\n    var matches = this.MatchedValues(propertyValue);\n    return singleOnly ? matches.length === 1 : matches.length > 0;\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"MatchedValues\", function (propertyValue) {\n    if (propertyValue == null) return;\n    return object_scan__WEBPACK_IMPORTED_MODULE_3___default()([\"**\"], {\n      joined: false,\n      filterFn: function filterFn(_ref) {\n        var value = _ref.value;\n        return value === propertyValue;\n      }\n    })(this);\n  });\n\n  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n    args[_key] = arguments[_key];\n  }\n\n  var obj = args && args.length > 0 && args[0];\n  if (!obj) return; // create an enum from the key/values in the first arg\n\n  for (var key in obj) {\n    this[key] = obj[key];\n  }\n\n  Object.freeze(this);\n}\n/*\n * ContainsValues\n *\n * Rummages through the enum and returns true/false if it can find properties matching\n * a given value.\n *\n * - propertyValue - the value to be searched for.\n * - singleOnly (boolean, default = true) - specifies whether or not you want\n *   to report only a single match of the given value.\n *\n */\n;\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Enum);\n\n//# sourceURL=webpack://mavickersFactor/./src/base/interfaces/Enum.js?");

/***/ }),

/***/ "./src/base/interfaces/Flags.js":
/*!**************************************!*\
  !*** ./src/base/interfaces/Flags.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ \"core-js/modules/es.array.concat.js\");\n/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ \"core-js/modules/es.array.filter.js\");\n/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ \"core-js/modules/es.array.find.js\");\n/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ \"core-js/modules/es.array.for-each.js\");\n/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ \"core-js/modules/es.array.includes.js\");\n/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ \"core-js/modules/es.array.iterator.js\");\n/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ \"core-js/modules/es.array.map.js\");\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ \"core-js/modules/es.number.constructor.js\");\n/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var core_js_modules_es_number_is_integer_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.number.is-integer.js */ \"core-js/modules/es.number.is-integer.js\");\n/* harmony import */ var core_js_modules_es_number_is_integer_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_is_integer_js__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var core_js_modules_es_object_get_own_property_names_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-names.js */ \"core-js/modules/es.object.get-own-property-names.js\");\n/* harmony import */ var core_js_modules_es_object_get_own_property_names_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_names_js__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.string.includes.js */ \"core-js/modules/es.string.includes.js\");\n/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ \"core-js/modules/es.string.iterator.js\");\n/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.string.trim.js */ \"core-js/modules/es.string.trim.js\");\n/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var core_js_modules_es_weak_map_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.weak-map.js */ \"core-js/modules/es.weak-map.js\");\n/* harmony import */ var core_js_modules_es_weak_map_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_weak_map_js__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ \"core-js/modules/web.dom-collections.for-each.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_15__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ \"core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_16__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"@babel/runtime/helpers/classCallCheck\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_17__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"@babel/runtime/helpers/createClass\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_18__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"@babel/runtime/helpers/defineProperty\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_19__);\n/* harmony import */ var _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldSet */ \"@babel/runtime/helpers/classPrivateFieldSet\");\n/* harmony import */ var _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_20__);\n/* harmony import */ var _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldGet */ \"@babel/runtime/helpers/classPrivateFieldGet\");\n/* harmony import */ var _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_21__);\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar _value = new WeakMap();\n\nvar _validatedArgs = new WeakMap();\n\nvar Flags = /*#__PURE__*/function () {\n  function Flags() {\n    var _this2 = this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_17___default()(this, Flags);\n\n    _value.set(this, {\n      writable: true,\n      value: 0\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_19___default()(this, \"clear\", function () {\n      _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_20___default()(this, _value, 0);\n\n      return this;\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_19___default()(this, \"hasAll\", function () {\n      var _classPrivateFieldGet3;\n\n      var value = _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_21___default()(this, _value);\n\n      var ctor = this.constructor;\n\n      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n\n      var _classPrivateFieldGet2 = (_classPrivateFieldGet3 = _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_21___default()(this, _validatedArgs)).call.apply(_classPrivateFieldGet3, [this].concat(args)),\n          intArgs = _classPrivateFieldGet2.intArgs,\n          stringArgs = _classPrivateFieldGet2.stringArgs;\n\n      var intArgsFound = intArgs.filter(function (arg) {\n        return (value & arg) != 0;\n      }).length;\n      var stringArgsFound = stringArgs.filter(function (arg) {\n        return (value & ctor[arg]) != 0;\n      }).length;\n      return stringArgsFound + intArgsFound === args.length;\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_19___default()(this, \"hasAny\", function () {\n      var _classPrivateFieldGet5;\n\n      var value = _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_21___default()(this, _value);\n\n      var ctor = this.constructor;\n\n      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n        args[_key2] = arguments[_key2];\n      }\n\n      var _classPrivateFieldGet4 = (_classPrivateFieldGet5 = _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_21___default()(this, _validatedArgs)).call.apply(_classPrivateFieldGet5, [this].concat(args)),\n          intArgs = _classPrivateFieldGet4.intArgs,\n          stringArgs = _classPrivateFieldGet4.stringArgs;\n\n      if (intArgs.find(function (arg) {\n        return value & arg;\n      })) return true;\n      if (stringArgs.find(function (arg) {\n        return value & ctor[arg];\n      })) return true;\n      return false;\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_19___default()(this, \"set\", function () {\n      var _classPrivateFieldGet7,\n          _this = this;\n\n      var ctor = this.constructor;\n\n      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {\n        args[_key3] = arguments[_key3];\n      }\n\n      var _classPrivateFieldGet6 = (_classPrivateFieldGet7 = _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_21___default()(this, _validatedArgs)).call.apply(_classPrivateFieldGet7, [this].concat(args)),\n          intArgs = _classPrivateFieldGet6.intArgs,\n          stringArgs = _classPrivateFieldGet6.stringArgs; // iterate through matching string and int args, bitwise-or the value\n      // onto the internal flag value\n\n\n      intArgs.forEach(function (arg) {\n        return _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_20___default()(_this, _value, _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_21___default()(_this, _value) | arg);\n      });\n      stringArgs.forEach(function (arg) {\n        return _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_20___default()(_this, _value, _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_21___default()(_this, _value) | ctor[arg]);\n      });\n      return this;\n    });\n\n    _validatedArgs.set(this, {\n      writable: true,\n      value: function value() {\n        var ctor = this.constructor;\n\n        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {\n          args[_key4] = arguments[_key4];\n        }\n\n        return {\n          intArgs: args.filter(function (arg) {\n            return Number.isInteger(arg) && ctor[\"_flags\"].map(function (flag) {\n              return ctor[flag];\n            }).includes(arg);\n          }) || [],\n          stringArgs: args.filter(function (arg) {\n            return typeof arg == \"string\" && arg.trim() && ctor[arg.trim()] && Number.isInteger(ctor[arg.trim()]);\n          }) || []\n        };\n      }\n    });\n\n    var props = Object.getOwnPropertyNames(this.constructor);\n    var blankProps = props.filter(function (prop) {\n      return _this2.constructor[prop] == undefined;\n    });\n    var power = 0;\n    var flags = []; // iterate through all the static props that have an undefined value\n\n    blankProps.forEach(function (prop) {\n      var value = Math.pow(2, power++); // remove the prop from the inheriting class...\n\n      delete _this2.constructor[prop]; // ...and add it back as a getter - we don't want to be able to\n      // mutate the value after instantiation\n\n      Object.defineProperty(_this2.constructor, prop, {\n        get: function get() {\n          return value;\n        }\n      });\n      flags.push(prop);\n    }); // take the prop names that we stored in the array and staple it as a\n    // static property to the inheriting class - we can use the array when\n    // validating arguments for flag mutation/reading; this should only happen\n    // once for each child class.\n\n    if (!props.includes(\"_flags\")) Object.defineProperty(this.constructor, \"_flags\", {\n      get: function get() {\n        return flags;\n      }\n    });\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_18___default()(Flags, [{\n    key: \"value\",\n    get: function get() {\n      return _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_21___default()(this, _value);\n    }\n  }]);\n\n  return Flags;\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Flags);\n\n//# sourceURL=webpack://mavickersFactor/./src/base/interfaces/Flags.js?");

/***/ }),

/***/ "./src/base/interfaces/Mappable.js":
/*!*****************************************!*\
  !*** ./src/base/interfaces/Mappable.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"@babel/runtime/helpers/classCallCheck\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"@babel/runtime/helpers/createClass\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"@babel/runtime/helpers/defineProperty\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ */ \"./src/index.js\");\n\n\n\n\n\nvar Mappable = /*#__PURE__*/function () {\n  function Mappable(obj) {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Mappable);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Mappable, [{\n    key: \"MapTo\",\n    value: function MapTo(mappingFunction) {\n      return mappingFunction(this);\n    }\n    /*\n     *  mapFrom - static\n     *\n     *   Returns a value/object given a mapping function and an object from which to perform the map.\n     *     - mappingFunction (required): a function that receives the raw object and returns a mapped object.\n     *     - obj (required): the raw object to be mapped.\n     *     - ancillaryData (default=null): an object containing a number of static properties whose values\n     *       may be assigned to the mapped object or used to compute other object properties;\n     *       default is null.\n     *     - withUnlistedPropertyMappings (default=false): specify whether or not to map properties to the\n     *       target object if the target object doesn't already contain a property with the name\n     *       specified in ancillaryData.\n     *     - overwrite (default=false): flag that indicated if the mapping function should overwrite a value\n     *       in the target object when there is a matching key name - useful when target and ancillaryData has\n     *       \"id\" keys for instance.\n     */\n\n  }]);\n\n  return Mappable;\n}();\n\n_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Mappable, \"MapFrom\", function (mapper, obj) {\n  var ancillaryData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;\n  var withUnlistedPropertyMappings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;\n  var overwrite = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;\n  if (!(mapper instanceof ___WEBPACK_IMPORTED_MODULE_3__.Mapper || mapper instanceof ___WEBPACK_IMPORTED_MODULE_3__.Mapper)) throw Error(\"Invalid mapper parameter in Mapper.mapFrom\");\n  if (!obj) return null;\n  if (!(obj instanceof Object || arrayData == null)) return null;\n  var isMultiple = Array.isArray(obj);\n  var mapped = isMultiple ? mapper.multiple(obj, ancillaryData) : mapper.single(obj, null, null, ancillaryData); // if we're mapping an array then we're done\n\n  if (isMultiple) return mapped; // if we have a mapped object and static mappings then lets map those static values to the mapped object\n\n  if (mapped && ancillaryData && ancillaryData instanceof Object) {\n    for (var mapping in ancillaryData) {\n      // if we have a value in the same key on the mapped object but\n      // don't have the overwrite flag set, skip it.\n      if (ancillaryData[mapping] && mapped[mapping] && !overwrite) continue; // map the value if we are bypassing property name checks or if the property name\n      // exists in the mapped object.\n\n      if (withUnlistedPropertyMappings || mapped.hasOwnProperty(mapping)) {\n        mapped[mapping] = ancillaryData[mapping];\n      }\n    }\n  }\n\n  return mapped;\n});\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Mappable);\n\n//# sourceURL=webpack://mavickersFactor/./src/base/interfaces/Mappable.js?");

/***/ }),

/***/ "./src/base/interfaces/StandardModel.js":
/*!**********************************************!*\
  !*** ./src/base/interfaces/StandardModel.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"@babel/runtime/helpers/classCallCheck\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"@babel/runtime/helpers/inherits\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"@babel/runtime/helpers/possibleConstructorReturn\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"@babel/runtime/helpers/getPrototypeOf\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../index */ \"./src/index.js\");\n\n\n\n\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\n\n\n\nvar StandardModel = /*#__PURE__*/function (_Classes) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default()(StandardModel, _Classes);\n\n  var _super = _createSuper(StandardModel);\n\n  function StandardModel(obj) {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, StandardModel);\n\n    return _super.call(this, obj);\n  }\n\n  return StandardModel;\n}((0,_index__WEBPACK_IMPORTED_MODULE_4__.Classes)([_index__WEBPACK_IMPORTED_MODULE_4__.Describing, _index__WEBPACK_IMPORTED_MODULE_4__.Mappable]));\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StandardModel);\n\n//# sourceURL=webpack://mavickersFactor/./src/base/interfaces/StandardModel.js?");

/***/ }),

/***/ "./src/classes/MapperOptionsFlag.js":
/*!******************************************!*\
  !*** ./src/classes/MapperOptionsFlag.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"@babel/runtime/helpers/classCallCheck\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"@babel/runtime/helpers/inherits\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"@babel/runtime/helpers/possibleConstructorReturn\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"@babel/runtime/helpers/getPrototypeOf\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"@babel/runtime/helpers/defineProperty\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../index */ \"./src/index.js\");\n\n\n\n\n\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\n\n\nvar MapperOptionsFlag = /*#__PURE__*/function (_Flags) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default()(MapperOptionsFlag, _Flags);\n\n  var _super = _createSuper(MapperOptionsFlag);\n\n  function MapperOptionsFlag() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, MapperOptionsFlag);\n\n    return _super.apply(this, arguments);\n  }\n\n  return MapperOptionsFlag;\n}(_index__WEBPACK_IMPORTED_MODULE_5__.Flags);\n\n_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(MapperOptionsFlag, \"None\", void 0);\n\n_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(MapperOptionsFlag, \"NullFiltering\", void 0);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MapperOptionsFlag);\n\n//# sourceURL=webpack://mavickersFactor/./src/classes/MapperOptionsFlag.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Classes\": () => /* reexport safe */ _base_Classes__WEBPACK_IMPORTED_MODULE_0__.default,\n/* harmony export */   \"Mapper\": () => /* reexport safe */ _base_Mapper__WEBPACK_IMPORTED_MODULE_1__.default,\n/* harmony export */   \"Utilities\": () => /* reexport safe */ _base_Utilities__WEBPACK_IMPORTED_MODULE_2__.default,\n/* harmony export */   \"Describing\": () => /* reexport safe */ _base_interfaces_Describing__WEBPACK_IMPORTED_MODULE_3__.default,\n/* harmony export */   \"Enum\": () => /* reexport safe */ _base_interfaces_Enum__WEBPACK_IMPORTED_MODULE_4__.default,\n/* harmony export */   \"Flags\": () => /* reexport safe */ _base_interfaces_Flags__WEBPACK_IMPORTED_MODULE_5__.default,\n/* harmony export */   \"Mappable\": () => /* reexport safe */ _base_interfaces_Mappable__WEBPACK_IMPORTED_MODULE_6__.default,\n/* harmony export */   \"StandardModel\": () => /* reexport safe */ _base_interfaces_StandardModel__WEBPACK_IMPORTED_MODULE_7__.default,\n/* harmony export */   \"MapperOptionsFlag\": () => /* reexport safe */ _classes_MapperOptionsFlag__WEBPACK_IMPORTED_MODULE_8__.default\n/* harmony export */ });\n/* harmony import */ var _base_Classes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base/Classes */ \"./src/base/Classes.js\");\n/* harmony import */ var _base_Mapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base/Mapper */ \"./src/base/Mapper.js\");\n/* harmony import */ var _base_Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base/Utilities */ \"./src/base/Utilities.js\");\n/* harmony import */ var _base_interfaces_Describing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base/interfaces/Describing */ \"./src/base/interfaces/Describing.js\");\n/* harmony import */ var _base_interfaces_Enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./base/interfaces/Enum */ \"./src/base/interfaces/Enum.js\");\n/* harmony import */ var _base_interfaces_Flags__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base/interfaces/Flags */ \"./src/base/interfaces/Flags.js\");\n/* harmony import */ var _base_interfaces_Mappable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./base/interfaces/Mappable */ \"./src/base/interfaces/Mappable.js\");\n/* harmony import */ var _base_interfaces_StandardModel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./base/interfaces/StandardModel */ \"./src/base/interfaces/StandardModel.js\");\n/* harmony import */ var _classes_MapperOptionsFlag__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./classes/MapperOptionsFlag */ \"./src/classes/MapperOptionsFlag.js\");\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://mavickersFactor/./src/index.js?");

/***/ }),

/***/ "@babel/runtime/helpers/classCallCheck":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/classCallCheck" ***!
  \********************************************************/
/***/ ((module) => {

eval("module.exports = require(\"@babel/runtime/helpers/classCallCheck\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22@babel/runtime/helpers/classCallCheck%22?");

/***/ }),

/***/ "@babel/runtime/helpers/classPrivateFieldGet":
/*!**************************************************************!*\
  !*** external "@babel/runtime/helpers/classPrivateFieldGet" ***!
  \**************************************************************/
/***/ ((module) => {

eval("module.exports = require(\"@babel/runtime/helpers/classPrivateFieldGet\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22@babel/runtime/helpers/classPrivateFieldGet%22?");

/***/ }),

/***/ "@babel/runtime/helpers/classPrivateFieldSet":
/*!**************************************************************!*\
  !*** external "@babel/runtime/helpers/classPrivateFieldSet" ***!
  \**************************************************************/
/***/ ((module) => {

eval("module.exports = require(\"@babel/runtime/helpers/classPrivateFieldSet\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22@babel/runtime/helpers/classPrivateFieldSet%22?");

/***/ }),

/***/ "@babel/runtime/helpers/createClass":
/*!*****************************************************!*\
  !*** external "@babel/runtime/helpers/createClass" ***!
  \*****************************************************/
/***/ ((module) => {

eval("module.exports = require(\"@babel/runtime/helpers/createClass\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22@babel/runtime/helpers/createClass%22?");

/***/ }),

/***/ "@babel/runtime/helpers/defineProperty":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/defineProperty" ***!
  \********************************************************/
/***/ ((module) => {

eval("module.exports = require(\"@babel/runtime/helpers/defineProperty\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22@babel/runtime/helpers/defineProperty%22?");

/***/ }),

/***/ "@babel/runtime/helpers/getPrototypeOf":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/getPrototypeOf" ***!
  \********************************************************/
/***/ ((module) => {

eval("module.exports = require(\"@babel/runtime/helpers/getPrototypeOf\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22@babel/runtime/helpers/getPrototypeOf%22?");

/***/ }),

/***/ "@babel/runtime/helpers/inherits":
/*!**************************************************!*\
  !*** external "@babel/runtime/helpers/inherits" ***!
  \**************************************************/
/***/ ((module) => {

eval("module.exports = require(\"@babel/runtime/helpers/inherits\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22@babel/runtime/helpers/inherits%22?");

/***/ }),

/***/ "@babel/runtime/helpers/possibleConstructorReturn":
/*!*******************************************************************!*\
  !*** external "@babel/runtime/helpers/possibleConstructorReturn" ***!
  \*******************************************************************/
/***/ ((module) => {

eval("module.exports = require(\"@babel/runtime/helpers/possibleConstructorReturn\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22@babel/runtime/helpers/possibleConstructorReturn%22?");

/***/ }),

/***/ "core-js/modules/es.array.concat.js":
/*!*****************************************************!*\
  !*** external "core-js/modules/es.array.concat.js" ***!
  \*****************************************************/
/***/ ((module) => {

eval("module.exports = require(\"core-js/modules/es.array.concat.js\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22core-js/modules/es.array.concat.js%22?");

/***/ }),

/***/ "core-js/modules/es.array.filter.js":
/*!*****************************************************!*\
  !*** external "core-js/modules/es.array.filter.js" ***!
  \*****************************************************/
/***/ ((module) => {

eval("module.exports = require(\"core-js/modules/es.array.filter.js\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22core-js/modules/es.array.filter.js%22?");

/***/ }),

/***/ "core-js/modules/es.array.find.js":
/*!***************************************************!*\
  !*** external "core-js/modules/es.array.find.js" ***!
  \***************************************************/
/***/ ((module) => {

eval("module.exports = require(\"core-js/modules/es.array.find.js\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22core-js/modules/es.array.find.js%22?");

/***/ }),

/***/ "core-js/modules/es.array.for-each.js":
/*!*******************************************************!*\
  !*** external "core-js/modules/es.array.for-each.js" ***!
  \*******************************************************/
/***/ ((module) => {

eval("module.exports = require(\"core-js/modules/es.array.for-each.js\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22core-js/modules/es.array.for-each.js%22?");

/***/ }),

/***/ "core-js/modules/es.array.includes.js":
/*!*******************************************************!*\
  !*** external "core-js/modules/es.array.includes.js" ***!
  \*******************************************************/
/***/ ((module) => {

eval("module.exports = require(\"core-js/modules/es.array.includes.js\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22core-js/modules/es.array.includes.js%22?");

/***/ }),

/***/ "core-js/modules/es.array.iterator.js":
/*!*******************************************************!*\
  !*** external "core-js/modules/es.array.iterator.js" ***!
  \*******************************************************/
/***/ ((module) => {

eval("module.exports = require(\"core-js/modules/es.array.iterator.js\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22core-js/modules/es.array.iterator.js%22?");

/***/ }),

/***/ "core-js/modules/es.array.map.js":
/*!**************************************************!*\
  !*** external "core-js/modules/es.array.map.js" ***!
  \**************************************************/
/***/ ((module) => {

eval("module.exports = require(\"core-js/modules/es.array.map.js\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22core-js/modules/es.array.map.js%22?");

/***/ }),

/***/ "core-js/modules/es.array.reduce.js":
/*!*****************************************************!*\
  !*** external "core-js/modules/es.array.reduce.js" ***!
  \*****************************************************/
/***/ ((module) => {

eval("module.exports = require(\"core-js/modules/es.array.reduce.js\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22core-js/modules/es.array.reduce.js%22?");

/***/ }),

/***/ "core-js/modules/es.function.name.js":
/*!******************************************************!*\
  !*** external "core-js/modules/es.function.name.js" ***!
  \******************************************************/
/***/ ((module) => {

eval("module.exports = require(\"core-js/modules/es.function.name.js\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22core-js/modules/es.function.name.js%22?");

/***/ }),

/***/ "core-js/modules/es.number.constructor.js":
/*!***********************************************************!*\
  !*** external "core-js/modules/es.number.constructor.js" ***!
  \***********************************************************/
/***/ ((module) => {

eval("module.exports = require(\"core-js/modules/es.number.constructor.js\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22core-js/modules/es.number.constructor.js%22?");

/***/ }),

/***/ "core-js/modules/es.number.is-integer.js":
/*!**********************************************************!*\
  !*** external "core-js/modules/es.number.is-integer.js" ***!
  \**********************************************************/
/***/ ((module) => {

eval("module.exports = require(\"core-js/modules/es.number.is-integer.js\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22core-js/modules/es.number.is-integer.js%22?");

/***/ }),

/***/ "core-js/modules/es.object.assign.js":
/*!******************************************************!*\
  !*** external "core-js/modules/es.object.assign.js" ***!
  \******************************************************/
/***/ ((module) => {

eval("module.exports = require(\"core-js/modules/es.object.assign.js\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22core-js/modules/es.object.assign.js%22?");

/***/ }),

/***/ "core-js/modules/es.object.freeze.js":
/*!******************************************************!*\
  !*** external "core-js/modules/es.object.freeze.js" ***!
  \******************************************************/
/***/ ((module) => {

eval("module.exports = require(\"core-js/modules/es.object.freeze.js\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22core-js/modules/es.object.freeze.js%22?");

/***/ }),

/***/ "core-js/modules/es.object.get-own-property-descriptor.js":
/*!***************************************************************************!*\
  !*** external "core-js/modules/es.object.get-own-property-descriptor.js" ***!
  \***************************************************************************/
/***/ ((module) => {

eval("module.exports = require(\"core-js/modules/es.object.get-own-property-descriptor.js\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22core-js/modules/es.object.get-own-property-descriptor.js%22?");

/***/ }),

/***/ "core-js/modules/es.object.get-own-property-names.js":
/*!**********************************************************************!*\
  !*** external "core-js/modules/es.object.get-own-property-names.js" ***!
  \**********************************************************************/
/***/ ((module) => {

eval("module.exports = require(\"core-js/modules/es.object.get-own-property-names.js\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22core-js/modules/es.object.get-own-property-names.js%22?");

/***/ }),

/***/ "core-js/modules/es.object.get-prototype-of.js":
/*!****************************************************************!*\
  !*** external "core-js/modules/es.object.get-prototype-of.js" ***!
  \****************************************************************/
/***/ ((module) => {

eval("module.exports = require(\"core-js/modules/es.object.get-prototype-of.js\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22core-js/modules/es.object.get-prototype-of.js%22?");

/***/ }),

/***/ "core-js/modules/es.object.to-string.js":
/*!*********************************************************!*\
  !*** external "core-js/modules/es.object.to-string.js" ***!
  \*********************************************************/
/***/ ((module) => {

eval("module.exports = require(\"core-js/modules/es.object.to-string.js\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22core-js/modules/es.object.to-string.js%22?");

/***/ }),

/***/ "core-js/modules/es.regexp.constructor.js":
/*!***********************************************************!*\
  !*** external "core-js/modules/es.regexp.constructor.js" ***!
  \***********************************************************/
/***/ ((module) => {

eval("module.exports = require(\"core-js/modules/es.regexp.constructor.js\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22core-js/modules/es.regexp.constructor.js%22?");

/***/ }),

/***/ "core-js/modules/es.regexp.exec.js":
/*!****************************************************!*\
  !*** external "core-js/modules/es.regexp.exec.js" ***!
  \****************************************************/
/***/ ((module) => {

eval("module.exports = require(\"core-js/modules/es.regexp.exec.js\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22core-js/modules/es.regexp.exec.js%22?");

/***/ }),

/***/ "core-js/modules/es.regexp.to-string.js":
/*!*********************************************************!*\
  !*** external "core-js/modules/es.regexp.to-string.js" ***!
  \*********************************************************/
/***/ ((module) => {

eval("module.exports = require(\"core-js/modules/es.regexp.to-string.js\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22core-js/modules/es.regexp.to-string.js%22?");

/***/ }),

/***/ "core-js/modules/es.string.includes.js":
/*!********************************************************!*\
  !*** external "core-js/modules/es.string.includes.js" ***!
  \********************************************************/
/***/ ((module) => {

eval("module.exports = require(\"core-js/modules/es.string.includes.js\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22core-js/modules/es.string.includes.js%22?");

/***/ }),

/***/ "core-js/modules/es.string.iterator.js":
/*!********************************************************!*\
  !*** external "core-js/modules/es.string.iterator.js" ***!
  \********************************************************/
/***/ ((module) => {

eval("module.exports = require(\"core-js/modules/es.string.iterator.js\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22core-js/modules/es.string.iterator.js%22?");

/***/ }),

/***/ "core-js/modules/es.string.replace.js":
/*!*******************************************************!*\
  !*** external "core-js/modules/es.string.replace.js" ***!
  \*******************************************************/
/***/ ((module) => {

eval("module.exports = require(\"core-js/modules/es.string.replace.js\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22core-js/modules/es.string.replace.js%22?");

/***/ }),

/***/ "core-js/modules/es.string.trim.js":
/*!****************************************************!*\
  !*** external "core-js/modules/es.string.trim.js" ***!
  \****************************************************/
/***/ ((module) => {

eval("module.exports = require(\"core-js/modules/es.string.trim.js\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22core-js/modules/es.string.trim.js%22?");

/***/ }),

/***/ "core-js/modules/es.weak-map.js":
/*!*************************************************!*\
  !*** external "core-js/modules/es.weak-map.js" ***!
  \*************************************************/
/***/ ((module) => {

eval("module.exports = require(\"core-js/modules/es.weak-map.js\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22core-js/modules/es.weak-map.js%22?");

/***/ }),

/***/ "core-js/modules/web.dom-collections.for-each.js":
/*!******************************************************************!*\
  !*** external "core-js/modules/web.dom-collections.for-each.js" ***!
  \******************************************************************/
/***/ ((module) => {

eval("module.exports = require(\"core-js/modules/web.dom-collections.for-each.js\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22core-js/modules/web.dom-collections.for-each.js%22?");

/***/ }),

/***/ "core-js/modules/web.dom-collections.iterator.js":
/*!******************************************************************!*\
  !*** external "core-js/modules/web.dom-collections.iterator.js" ***!
  \******************************************************************/
/***/ ((module) => {

eval("module.exports = require(\"core-js/modules/web.dom-collections.iterator.js\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22core-js/modules/web.dom-collections.iterator.js%22?");

/***/ }),

/***/ "lodash.clonedeep":
/*!***********************************!*\
  !*** external "lodash.clonedeep" ***!
  \***********************************/
/***/ ((module) => {

eval("module.exports = require(\"lodash.clonedeep\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22lodash.clonedeep%22?");

/***/ }),

/***/ "object-hash":
/*!******************************!*\
  !*** external "object-hash" ***!
  \******************************/
/***/ ((module) => {

eval("module.exports = require(\"object-hash\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22object-hash%22?");

/***/ }),

/***/ "object-scan":
/*!******************************!*\
  !*** external "object-scan" ***!
  \******************************/
/***/ ((module) => {

eval("module.exports = require(\"object-scan\");;\n\n//# sourceURL=webpack://mavickersFactor/external_%22object-scan%22?");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/index.js");
/******/ })()
;
});