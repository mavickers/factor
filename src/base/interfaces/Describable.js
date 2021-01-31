import Utilities from "../Utilities";

//const configId = Symbol("describable");
const configId = "16B663BC-F892-4BF2-B628-A4331F9C874D";

class Describable {
    differencesFrom(obj) {
        const diffs = { };

        Object.getOwnPropertyNames(this)
            .filter(prop =>
                prop != "constructor" &&
                prop != "__ob__" &&
                typeof this[prop] != "function" &&
                !(this[prop] instanceof Function)
            )
            .forEach(prop => {
                const hashFn = Utilities.isFunction(this.constructor[configId]?.["hashFn"] ?? false) && this.constructor[configId]?.["hashFn"] || throw Error("Hash function not available");

                // if the property is an object and the hash of the property of this object is same
                // to the hash of the property of the comparing object, the property not considered different.
                if (this[prop] instanceof Object && obj[prop] && hashFn(this[prop]) == hashFn(obj[prop])) return;

                // if this property value is not an object and the property of this object has the same
                // value as the property value of the comparing object the project is not considered different.
                if (!(this[prop] instanceof Object) && this[prop] == obj[prop]) return;

                // it seems the property value is different, so add it to the list of different values.
                diffs[prop] = obj[prop];
            });

        return diffs;
    }

    get className() {
        return this.__proto__.constructor.name;
    }

    clone() {
        return Utilities.isFunction(this.constructor[configId]?.["cloneFn"] ?? false)
            ? this.constructor[configId]["cloneFn"](this)
            : throw new Error("Describing.clone(): clone function invalid");
    }

    get hash() {
        return Utilities.isFunction(this.constructor[configId]?.["hashFn"] ?? false)
            ? this.constructor[configId]["hashFn"](this)
            : throw new Error("Describing.hash(): hash function invalid");
    }

    static isArrayOfThis = function(obj) { return Utilities.isArrayOfType(obj, this); }

    static useHashFunction(hashFn) {
        if (!Utilities.isFunction(hashFn)) throw new Error("Provided hash function is not valid");

        this[configId] = this[configId] || { };
        this[configId]["hashFn"] = hashFn;
    }

    static useCloneFunction(cloneFn) {
        if (!Utilities.isFunction(cloneFn)) throw new Error("Provided clone function is not valid");

        this[configId] = this[configId] || { };
        this[configId]["cloneFn"] = cloneFn;
    }
}

export default Describable;
