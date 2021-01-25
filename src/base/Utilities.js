import StandardModel from "./classes/StandardModel";
import Globals from "./Globals";

const isStrict = (function(){ return !this; })();

class Utilities {
    static copyAndSeal = (obj) => Object.seal(JSON.parse(JSON.stringify(obj)));
    static currentLineNumber() {
        let initiator;
        try { throw new Error() }
        catch (e) {
            if (typeof e.stack === 'string') {
                let isFirst = true;
                for (const line of e.stack.split('\n')) {
                    const matches = line.match(/^\s+at\s+(.*)/);
                    if (matches) {
                        if (!isFirst) { // first line - current function
                            // second line - caller (what we are looking for)
                            initiator = matches[1];
                            break;
                        }
                        isFirst = false;
                    }
                }
            }
        }

        return initiator;
        // const stack = function() {
        //     const orig = Error.prepareStackTrace;
        //     Error.prepareStackTrace = function(_, stack) {
        //         return stack;
        //     };
        //     const err = new Error;
        //     Error.captureStackTrace(err, this);
        //     const stack = err.stack;
        //     Error.prepareStackTrace = orig;
        //     return stack;
        // };
        //
        // return stack()[1].getLineNumber();
    };
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
        if (!(obj && Array.isArray(obj) && type && type.toString().trim())) return false;
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
    static isFunction = (obj) => obj && (typeof obj === "function" || obj instanceof Function) && true || false;
    static isNumber = (obj) => obj && (typeof obj === "number" || obj instanceof Number) && true || false;
    static isObject = (obj) => obj && (typeof obj === "object" || obj instanceof Object) && true || false;
    static isPrimitive = (obj) => false;
    static isPureObject = (obj) => obj && Utilities.isObject(obj) && Utilities.getClassName(obj) === "Object" || false;
    static get isStrict() { return isStrict; };
    static isString = (obj) => (typeof obj === "string" || obj instanceof String) && true || false;
    static isType = (obj, type) => {
        if (obj === null || obj === undefined || type === null || type === undefined) return false;
        if (typeof type == "string") return typeof obj === type;

        return obj instanceof type || Globals.Primitives.map(p => p.name).includes(typeof obj);
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
    static newUuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);

            return v.toString(16);
        });
    }
}

export default Utilities;
