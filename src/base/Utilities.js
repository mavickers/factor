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
    static GetFuncParams (func) {
        if (!(func && func instanceof Function)) throw Error("Invalid param 'func' in funcParams()");

        return new RegExp('(?:'+func.name+'\\s*|^)\\s*\\((.*?)\\)').exec(func.toString().replace(/\n/g, ''))[1].replace(/\/\*.*?\*\//g, '').replace(/ /g, '');
    }

    static GetParentClassName = (obj) => Object.getPrototypeOf(obj.constructor).name;
    static IsArrayOfType = (obj, type) => obj && Array.isArray(obj) && obj.reduce((acc, col) => acc && col instanceof type, true) || false;
    static IsClass = (obj) => {
        // if the string content of the given object satisfies any of these conditions,
        // consider the object as a class:
        // - string starts with "class" (native class declaration)
        // - string contains "_classCallCheck" (babelized class)
        // - string contains "native code" (native object)

        return typeof obj === 'function' && /^\s*class\s+|_classCallCheck|native\scode/.test(obj.toString());
    }
}

export default Utilities;
