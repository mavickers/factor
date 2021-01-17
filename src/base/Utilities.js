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
    // todo: revisit this method - this may confuse when using class vs instance
    static getChildClass = (obj) => Object.getPrototypeOf(obj).constructor;
    static getFuncParams (func) {
        if (func.length === 0) return [];

        let string = func.toString();
        let args;

        // first match everything inside the function argument parens. like
        // `function (arg1,arg2) {}` or `async function(arg1,arg2) { }

        args = string.match(/(?:async|function)\s*.*?\(([^)]*)\)/)?.[1] ||
            // arrow functions with multiple arguments  like `(arg1,arg2) => {}`
            string.match(/^\s*\(([^)]*)\)\s*=>/)?.[1] ||
            // arrow functions with single argument without parens like `arg => {}`
            string.match(/^\s*([^=]*)=>/)?.[1]

        // split the arguments string into an array comma delimited.
        // - ensure no inline comments are parsed and trim the whitespace.
        // - ensure no undefined values are added.
        return args.split(',').map(arg => arg.replace(/\/\*.*\*\//, '').trim()).filter(arg => arg);

        // if (!(func && func instanceof Function)) throw Error("Utilities.getFuncParams(): invalid param 'func'");
        //
        // const expr = new RegExp('(?:'+func.name+'\\s*|^)\\s*\\((.*?)\\)');
        // const matches = expr.exec(func.toString().replace(/\n/g, ''));
        //
        // console.log(matches);
        //
        // return new RegExp('(?:'+func.name+'\\s*|^)\\s*\\((.*?)\\)').exec(func.toString().replace(/\n/g, ''))[1].replace(/\/\*.*?\*\//g, '').replace(/ /g, '');
    };
    // todo: revisit the following two methods - these may confuse when using class vs instance
    static getParentClass = (obj) => Object.getPrototypeOf(obj.constructor);
    static getParentClassName = (obj) => Object.getPrototypeOf(obj.constructor).name;
    static isArrayOfType = (obj, type) => obj && Array.isArray(obj) && obj.reduce((acc, col) => acc && col instanceof type, true) || false;
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
