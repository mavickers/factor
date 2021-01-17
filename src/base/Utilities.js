class Utilities {

    /*
     *  funcParams()
     *
     *  Returns the name of the parameters for a given function.
     *
     *  Stolen from https://stackoverflow.com/a/39253854/1809473
     *
     *  May not work properly with params that have a default value.
     *
     */

    static copyAndSeal = (obj) => Object.seal(JSON.parse(JSON.stringify(obj)));
    /*
     *  getChildClass(obj)
     *  - obj: instantiated object
     *
     *  Returns the class/function that the instantiated object belongs to; use-
     *  case is for inside of a parent class where you want to know the extending
     *  class.
     *
     */
    static getChildClass = (obj) => Object.getPrototypeOf(obj).constructor;
    static getChildClassName = function(obj) { return this.getChildClass(obj).name; };

    /*
     *  getFuncParams
     *  lifted from https://stackoverflow.com/a/64505640/1809473
     *
     */
    static getFuncParams (func) {
        if (func.length === 0) return [];

        let string = func.toString().replace(/\/\*.*\*\//, '');
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
    // todo: revisit the following two methods - these may confuse when using class vs instance
    /*
     *  getParentClass(obj)
     *  - obj: instantiated object
     *
     *  Returns the class being extended.
     *
     */
    static getParentClass = (obj) => Object.getPrototypeOf(obj.constructor);
    static getParentClassName = function(obj) { return this.getParentClass(obj).name; };
    static isArrayOfType = function(obj, type) {
        if (!(obj && Array.isArray(obj) && type && type.toString().trim())) return false;
        return (typeof type == "string")
            ? (obj.reduce((acc, col) => acc && typeof col === type, true) || false)
            : (obj.reduce((acc, col) => acc && col instanceof type, true) || false);
    }
    static isClass = (obj) => {
        // if the string content of the given object satisfies any of these conditions,
        // consider the object as a class:
        // - string starts with "class" (native class declaration)
        // - string contains "_classCallCheck" (babelized class)
        // - string contains "native code" (native object)

        return typeof obj === 'function' && /^\s*class\s+|_classCallCheck|native\scode/.test(obj.toString());
    };
    static isClassedWith = (obj, className) => {
        return Array.isArray(obj) && className && typeof className == "string" && obj.includes(className);
    };
    static isFunction = (obj) => obj && (typeof obj === "function" || obj instanceof Function) && true || false;
    static isObject = (obj) => obj && (typeof obj === "object" || obj instanceof Object) && true || false;
    static isString = (obj) => obj && (typeof obj === "string" || obj instanceof String) && true || false;
}

export default Utilities;
