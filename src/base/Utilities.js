import Globals from "./Globals";

const isStrict = (function(){ return !this; })();

export default class Utilities {
    static copyAndSeal = (obj) => Object.seal(JSON.parse(JSON.stringify(obj)));
    /*
     *  getClass(obj)
     *  - obj: instantiated object
     *
     *  Returns the class/function that the instantiated object belongs to; use-
     *  case is for inside of a parent class where you want to know the extending
     *  class.
     *
     */
    static getClass = (obj) => obj && Object.getPrototypeOf(obj).constructor || null;
    static getClassName = function(obj) { return this.getClass(obj).name; };
    static getCurrentLocation(back) {
        back = Utilities.isNumber(back) && back || 0;

        try { throw new Error() }
        catch (err) {
            const stack = err.stack.split("\n").map(s => s.trim()).filter(s => s.startsWith("at "));
            const location = stack[1 + back];
            const file = location.split(" ").slice(-1)[0].split(":");
            const fileName = file.length === 3 && file[0].split("\/").slice(-1)[0] || location.split(" ").slice(1).join(" ")
            const lineNumber = file.length === 3 && file[1] || 0;
            const colNumber = file.length === 3 && file[2].split(")")[0] || 0;

            return { fileName: fileName, lineNumber: lineNumber, colNumber: colNumber, location: location, stack: stack };
        }
    };
    static findFrom(...args) {
        return {
            firstInheritanceOf: (objClass) =>
                Utilities.isClass(objClass) &&
                Utilities.getClass(Utilities.findFrom(...args).firstInstanceOf(objClass)),
            firstInstanceOf: (objClass) =>
                Utilities.isClass(objClass) &&
                args.flat().find(arg => Utilities.getParentClass(arg) === objClass) ||
                null
        }
    }

    /*
     *  getFuncParams
     *  lifted from https://stackoverflow.com/a/64505640/1809473
     *
     */
    static getFuncParams (func) {
        const fnString = func.toString();

        if (func.length === 0 && !fnString.match(/^function\s*\(([a-zA-z].+)/)) return [];

        let string = fnString.replace(/\/\*.*\*\//, "").replace(/\=.*?\,/g,",").replace(/=.*?\)/g,")");
        let args;

        // first match everything inside the function argument parens. like
        // `function (arg1,arg2) {}` or `async function(arg1,arg2) { }

        args =
            string.match(/(?:async|function)\s*.*?\(([^)]*)\)/)?.[1] ||
            // arrow functions with multiple arguments  like `(arg1,arg2) => {}`
            string.match(/^\s*\(([^)]*)\)\s*=>/)?.[1] ||
            // arrow functions with single argument without parens like `arg => {}`
            string.match(/^\s*([^=]*)=>/)?.[1]

        // split the arguments string into a comma delimited array.
        // - ensure no inline comments are parsed and trim the whitespace.
        // - ensure no undefined values are added.
        return args.split(',').map(arg => arg.trim()).filter(arg => arg);
    };
    /*
     *  getParentClass(obj)
     *  - obj: instantiated object
     *
     *  Returns the class being extended.
     *
     */
    static getParentClass = (obj) => obj && Object.getPrototypeOf(obj.constructor) || null;
    static getParentClassName = function(obj) { return this.getParentClass(obj).name; };
    static getPrototypeString = (obj) => Object.prototype.toString.call(obj);
    static is(obj) {
        return {
            BooleanOrDefault: (defaultValue) =>
                Utilities.isBoolean(obj)
                    ? obj : Utilities.isBoolean(defaultValue)
                    ? defaultValue : throw new Error("invalid default value")
        }
    }
    static isArrayOfType = function(obj, type) {
        if (!(obj && Array.isArray(obj) && obj.length > 0 && type && type.toString().trim())) return false;
        return (typeof type == "string")
            ? (obj.reduce((acc, col) => acc && typeof col === type, true) || false)
            : (obj.reduce((acc, col) => acc && col instanceof type, true) || false);
    }
    static isBoolean = (obj) => (typeof obj === "boolean" || obj instanceof Boolean) && true || false;
    static isClass = (obj) => {
        // if the string content of the given object satisfies any of these conditions,
        // consider the object as a class:
        // - string starts with "class" (native class declaration)
        // - string contains "_classCallCheck" (babelized class)
        // - string contains "native code" (native object)

        return typeof obj === 'function' && /^\s*class\s+|_classCallCheck|native\scode/.test(obj.toString());
    };
    static isDate = (obj) => obj && Object.prototype.toString.call(obj) === "[object Date]" && true || false;
    static isError = (obj) => obj && obj instanceof Error && true || false;
    static isFunction = (obj) => obj && (typeof obj === "function" || obj instanceof Function) && true || false;
    static isInheriting = (obj, cl) =>
        Utilities.isClass(obj) &&
        Array.isArray(obj._inherited?.classes) &&
        obj._inherited.classes.includes(cl);
    static isNumber = (obj) => obj && (typeof obj === "number" || obj instanceof Number) && true || false;
    static isObject = (obj) => obj && (typeof obj === "object" || obj instanceof Object) && true || false;
    static isPrimitive = (obj) => false;
    static isPureObject = (obj) => obj && Utilities.isObject(obj) && Utilities.getClassName(obj) === "Object" || false;
    static get isStrict() { return isStrict; };
    static isString = (obj) => (typeof obj === "string" || obj instanceof String) && true || false;
    static isType = (obj, type) => {
        if (obj === null || obj === undefined || type === null || type === undefined) return false;
        if (typeof type == "string") return typeof obj === type;

        return obj instanceof type || Globals.Primitives.map(p => p.name).includes(type) && type === typeof obj;
    }
    // todo: change this back to immutable
    static merge = (...args) => {
        if (!(args && args.length > 1)) return false;

        const doMerge = (target, obj) => {
            const keys = Object.keys(obj).filter(key => obj.hasOwnProperty(key));

            keys.forEach(key => target[key] = target[key] != undefined && Utilities.isPureObject(obj[key]) && doMerge(target[key], obj[key]) || obj[key]);
        }

        args.filter(arg => args.indexOf(arg) != 0 && Utilities.isPureObject(arg)).forEach(arg => doMerge(args[0], arg));
    };
    static mergeToNew(...args) {
        const newObj = {}

        Utilities.merge(newObj, ...args);

        return newObj;
    };

    //
    // mixin
    // lifted from http://raganwald.com/2015/06/26/decorators-in-es7.html
    //

    static mixin(behaviour, sharedBehaviour = {}) {
        const instanceKeys = Reflect.ownKeys(behaviour);
        const sharedKeys = Reflect.ownKeys(sharedBehaviour);
        const typeTag = Symbol('isa');

        function _mixin (clazz) {
            instanceKeys.forEach(property => Object.defineProperty(clazz.prototype, property, { value: behaviour[property], writable: true }));
            Object.defineProperty(clazz.prototype, typeTag, { value: true });

            return clazz;
        }

        sharedKeys.forEach(property => Object.defineProperty(_mixin, property, { value: sharedBehaviour[property], enumerable: sharedBehaviour.propertyIsEnumerable(property)}));
        Object.defineProperty(_mixin, Symbol.hasInstance, { value: (i) => !!i[typeTag] });

        return _mixin;
    }

    static newMixin(behaviors, isShared = false) {
        const keys = Reflect.ownKeys(behaviors);
        console.log(keys);
        const typeTag = Symbol("isa");

        function _mixin(targetClass) {
            !isShared && keys.forEach(property => Object.defineProperty(targetClass.prototype, property, { value: behaviors[property], writable: true }));
            isShared && keys.forEach(property => Object.defineProperty(targetClass, property, { value: behaviors[property], enumerable: behaviors.propertyIsEnumerable(property)}));

            Object.defineProperty(targetClass.prototype, typeTag, { value: true });
            Object.defineProperty(targetClass, Symbol.hasInstance, { value: (i) => !!i[typeTag] });

            return targetClass;
        }


        return _mixin;
    }

    static newUuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);

            return v.toString(16);
        });
    }
    static newUuidShort() {
        return Utilities.newUuid().split("-").slice(-1)[0];
    }
}
