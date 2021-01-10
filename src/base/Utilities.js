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
    static getFuncParams (func) {
        if (!(func && func instanceof Function)) throw Error("Invalid param 'func' in funcParams()");

        return new RegExp('(?:'+func.name+'\\s*|^)\\s*\\((.*?)\\)').exec(func.toString().replace(/\n/g, ''))[1].replace(/\/\*.*?\*\//g, '').replace(/ /g, '');
    };

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
    static isFunction = (obj) => obj && (typeof obj === "function" || obj instanceof Function) || false;
}

export default Utilities;
