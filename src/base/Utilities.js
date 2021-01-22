class Utilities {

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
    static getClass = (obj) => Object.getPrototypeOf(obj).constructor;
    static getClassName = function(obj) { return this.getClass(obj).name; };

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
    static getParentClass = (obj) => Object.getPrototypeOf(obj.constructor);
    static getParentClassName = function(obj) { return this.getParentClass(obj).name; };
    static getPrototypeString = (obj) => Object.prototype.toString.call(obj);
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
    static isPureObject = (obj) => obj && Utilities.isObject(obj) && Utilities.getClassName(obj) === "Object" || false;
    static isString = (obj) => (typeof obj === "string" || obj instanceof String) && true || false;
    static merge = (...args) => {
        if (!(args && args.length > 1)) return false;

        const doMerge = function(target, obj) {
            const keys = Object.keys(obj).filter(key => obj.hasOwnProperty(key));

            keys.forEach(key => target[key] = target[key] != undefined && Utilities.isPureObject(obj[key]) && doMerge(target[key], obj[key]) || obj[key]);
        }

        args.filter(arg => args.indexOf(arg) != 0).forEach(arg => doMerge(args[0], arg));
    };
    // static merge = (...args) => {
    //     let target = {};
    //
    //     const merger = (obj) => {
    //         Object.keys(obj).forEach(key => {
    //             if (!obj.hasOwnProperty(key)) return;
    //
    //             target[key] = Object.prototype.toString.call(target[key]) === "[object Object]"
    //                 ? Utilities.merge(target[key], obj[key])
    //                 : obj[key];
    //         })
    //     }
    //
    //     args.forEach(arg => merger(arg));
    //
    //     return target;
    // }
}

export default Utilities;
