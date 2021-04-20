import Classes from "./classes";

const { getClassName } = Classes;

const copyAndSeal = (obj) => Object.seal(JSON.parse(JSON.stringify(obj)));
const isObject = (obj) => obj && (typeof obj === "object" || obj instanceof Object) && true || false;
const isPureObject = (obj) => obj && isObject(obj) && getClassName(obj) === "Object" || false;
const merge = (...args) => {
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
            isPureObject(source[key]) &&
            doMerge(target[key], source[key]) ||
            (target[key] = source[key]);
        });

        return true;
    }

    args.filter(arg => isPureObject(arg)).forEach(arg => { doMerge(newObj, arg) });

    return newObj;
};

export {
    copyAndSeal,
    isObject,
    isPureObject,
    merge
};

export default {
    copyAndSeal,
    isObject,
    isPureObject,
    merge
};
