import Globals from "../Globals";
import Mixin from "../classes/Mixin";
import RandomGenerator from "../pipelines/RandomGenerator";

import { copyAndSeal, isObject, isPureObject } from "./objects";
import { isBoolean } from "./booleans";
import { isError } from "./errors";
import { isFunction } from "./functions";
import { isNumber } from "./numbers";
import { isString } from "./strings";
import { getType, isType } from "./types";
import { getClass, getClassName, isClass } from "./classes";
import { isNil, isNotNil } from "./nil";
import { newUuid, newUuidShort } from "./uuid";
import { PipelineArgs } from "../components/Pipeline";

const isStrict = (function(){ return !this; })();

export default class Utilities {
    static copyAndSeal = copyAndSeal;
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
    static getClass = getClass;
    static getClassName = getClassName;
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
    static getFuncsFromContext(context) {
        const funcs = [];

        return context &&
            Object.getOwnPropertyNames(context).forEach(name => context[name] instanceof Function && funcs.push(context[name])) &&
            funcs || funcs;
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
    static getInheritances = (obj) => {
        // get the prototype, whether this is an instance or a class
        let prototype = Utilities.isClass(obj) ? Object.getPrototypeOf(obj) : Utilities.getClass(obj);
        // add any mixin classes if they are on the object
        let classes = obj[Mixin.configId]?.classes || [];

        while (this.isClass(prototype)) {
            classes.push(prototype);
            // if there are unique mixin classes on the current prototype
            // push them into classes
            prototype[Mixin.configId]?.classes?.forEach(cls => !classes.includes(cls) && classes.push(cls));
            prototype = Object.getPrototypeOf(prototype);
        }

        return classes.reverse();
    };
    static getInheritanceNames = (obj) => Utilities.getInheritances(obj).map(cl => cl.name);
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
    // a quick and dirty way of getting a random value for a specified type
    static getRandom = (args) => RandomGenerator.execute(new PipelineArgs(args)).data.targetValue;
    static getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    static getType = getType;
    static hasAll = (arr, items) => {
        if (!(Array.isArray(arr) && Array.isArray(items))) return false;

        return items.reduce((acc, item) => arr.includes(item) && acc, true);
    }

    // todo: this is probably going to be deprecated
    static is(obj) {
        if (obj === null || obj === undefined) return false;



        return {
            BooleanOrDefault: (defaultValue) =>
                Utilities.isBoolean(obj)
                    ? obj : Utilities.isBoolean(defaultValue)
                    ? defaultValue : throw new Error("invalid default value")
        }
    }
    static isArguments = (obj) => obj && Object.prototype.toString.call(obj) === "[object Arguments]" && true || false;
    static isArrayOfType = function(obj, type) {
        if (!(obj && Array.isArray(obj) && obj.length > 0 && type && type.toString().trim())) return false;
        return (typeof type == "string")
            ? (obj.reduce((acc, col) => acc && typeof col === type, true) || false)
            : (obj.reduce((acc, col) => acc && col instanceof type, true) || false);
    }
    static isBoolean = isBoolean;
    static isClass = isClass;
    static isDate = (obj) => obj && Object.prototype.toString.call(obj) === "[object Date]" && true || false;
    static isError = isError;
    static isFunction = isFunction;
    static isInheriting = (obj, targetClass) => {
        const inheritances = this.getInheritances(obj);

        return (this.isClass(targetClass) && inheritances.includes(targetClass)) ||
            (isString(targetClass) && inheritances.map(inheritance => inheritance.name).includes(targetClass)) ||
            false;
    };
    static isNil = isNil;
    static isNotNil = isNotNil;
    static isNumber = isNumber;
    static isObject = isObject;
    static isPureObject = isPureObject;
    static get isStrict() { return isStrict; };
    static isString = isString;
    static isType = isType;
    static merge = (...args) => {
        const newObj = { };

        if (!(args && args.length > 0)) return { };
        if (args.length == 1) return args[0];

        const doMerge = (target, source) => {
            const keys = Object.keys(source).filter(key => source.hasOwnProperty(key));

            // iterate through the source keys; if a) there is a corresponding
            // key in the target and b) the key value in the source is an
            // object the recursively merge the object; otherwise, set the
            // value in the target to the value in the source; recursively
            // this will drill down until the unit operated on is a primitive
            // which is then copied to the source; this also also copies
            // keys in the source that are not in the target.

            keys.forEach(key => {
                target[key] &&
                Utilities.isPureObject(source[key]) &&
                doMerge(target[key], source[key]) ||
                (target[key] = source[key]);
            });

            return true;
        }

        args.filter(arg => Utilities.isPureObject(arg)).forEach(arg => { doMerge(newObj, arg) });

        return newObj;
    };

    static newUuid = newUuid;
    static newUuidShort = newUuidShort;

    /*
     *  parseArgs(obj: Object, args: Array): Object
     *
     *  Parses an array using an Object key/value pair as a map returning
     *  an object mapping the names to argument values.
     *
     *  obj: key/value pair defining the name and order of the arguments; the
     *       key should be a string and the value should be a primitive or
     *       class type.
     *  args: an array containing the argument values.
     *
     *  Example: parseArgs({ "firstBool": Boolean, "firstString": String", "secondBool": Boolean, "firstNumber": Number }, [ true, false, 3, "testing" ])
     *  Returns: { firstBool: true, firstString: "testing", secondBool: false, firstNumber: 3 }
     *
     */
    static parseArgs(map, args) {
        // validate args
        if (!(map && map instanceof Object)) return { };
        if (!(args && Array.isArray(args) && args.length > 0)) return { };

        const primitives = [ BigInt, Boolean, Number, String, Symbol ];
        let parsedMap = { },
            parsedArgs = { };

        // first thing we need to do is flip the map around
        Object.getOwnPropertyNames(map)
            .filter(key => primitives.includes(map[key]))
            .forEach(key => parsedMap[map[key]] = (parsedMap[map[key]] ?? [ ]).concat([ key ]));

        // now iterate through the parseMap and

        const classNames = { };
        const primitiveNames = Object.getOwnPropertyNames(primitives);
        // parse out the keys from obj; we want only keys that are strings and
        // keys whose values are either primitive types or defined classes.
        const keys = Object.getOwnPropertyNames(map) || [ ]
            .filter(key => typeof key === "string") || [ ]
            .filter(key => primitiveNames.includes(map[key]) || (this.isClass(map[key]) && (classNames[key] = 0))) || [ ];

        // validate keys & args
        if (!(keys && keys.length > 0)) return { };
        if (!(args && Array.isArray(args) && args.length > 0)) return { };


        // if the obj value for the key is a primitive, set the corresponding key
        // in parsed to the obj value and increment the primitive counter;
        // if the obj value for the key isn't a primitive, check classNames for a
        // corresponding key; if it exists, increment the counter value, otherwise
        // create the key and set the counter to 1, then return the obj key value.
        // keys.forEach(key => {
        //     parsed[key] = primitiveNames.includes(obj[key])
        //         ? args.filter(arg => typeof arg === primitiveNames[key].toLowerCase())[primitives[obj[key]++]]
        //         : (classNames[obj[key]] = (classNames[obj[key]] || 0) + 1) && key;
        keys.forEach(key => {
            parsedArgs[key] = primitiveNames.includes(map[key])
                ? args.filter(arg => typeof arg === primitiveNames[key].toLowerCase())[primitives[map[key]++]]
                : args.filter(arg => classNames)
        });

        return parsedArgs;
    }

    static parseType(typeName, ...classes) {
        let parseType;

        if (!(typeName && typeof typeName === "string")) return undefined;

        // if the typeName matches a primitive or structure, return the type

        if (parseType = Globals.Primitives.find(p => p.name === typeName.toLowerCase())) return parseType.type;
        if (parseType = Globals.Structurals.find(s => s.name === typeName.toLowerCase())) return parseType.type;

        // now we need to check against classes passed in; return undefined if
        // classes is not valid, otherwise scoop the valid classes together.

        const validClasses = Array.isArray(classes) && classes.filter(cls => Utilities.isClass(cls) && !Globals.Primitives.find(p => p.type === cls)) || [];

        // find a matching class/type and return it

        return validClasses.find(c => c.name === typeName);
    }

    static spread(args, names, obj = { }) {
        Utilities.isArrayOfType(names, "string") &&
        names.forEach(name => obj[name] = args[names.indexOf(name)]);

        return obj;
    }

    static valueOrDefault = (value, defaultValue) => Utilities.isNotNil(value) ? value : defaultValue;
}
