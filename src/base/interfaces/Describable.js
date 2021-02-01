import Utilities from "../Utilities";

const configId = Symbol("describable");

class Describable {
    get className() {
        return this.__proto__.constructor.name;
    }

    clone() {
        return Utilities.isFunction(this.constructor[configId]?.["cloneFn"] ?? false)
            ? this.constructor[configId]["cloneFn"](this)
            : throw new Error("Describing.clone(): clone function invalid");
    }

    diff(obj) {
        return Utilities.isFunction(this.constructor[configId]?.["diffFn"] ?? false)
            ? this.constructor[configId]["diffFn"](this, obj)
            : throw new Error("Describing.diff(): diff function invalid");
    }

    get hash() {
        return Utilities.isFunction(this.constructor[configId]?.["hashFn"] ?? false)
            ? this.constructor[configId]["hashFn"](this)
            : throw new Error("Describing.hash(): hash function invalid");
    }

    static isArrayOfThis = function(obj) { return Utilities.isArrayOfType(obj, this); }

    static useCloneFunction(cloneFn) {
        if (!Utilities.isFunction(cloneFn)) throw new Error("Provided clone function parameter is not valid");

        this[configId] = this[configId] || { };
        this[configId]["cloneFn"] = cloneFn;
    }

    static useDiffFunction(diffFn) {
        if (!Utilities.isFunction(diffFn)) throw new Error("Provided diff function parameter is not valid");

        this[configId] = this[configId] || { };
        this[configId]["diffFn"] = diffFn;
    }

    static useHashFunction(hashFn) {
        if (!Utilities.isFunction(hashFn)) throw new Error("Provided hash function parameter is not valid");

        this[configId] = this[configId] || { };
        this[configId]["hashFn"] = hashFn;
    }
}

export default Describable;
