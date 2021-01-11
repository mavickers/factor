import Utilities from "../Utilities";
import Configurable from "../interfaces/Configurable";

class Describing extends Configurable {
    constructor() {
        super();
    }

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

    get hash() {
        if (!(Describing.configuration && Describing.configuration.hashFn)) {
            console.warn("Describing.hash(): hashFn configuration missing");
            return;
        }
        if (!(typeof Describing.configuration.hashFn == "function" || Describing.configuration.hashFn instanceof Function)) {
            console.warn("Describing.hash(): scanFn configuration invalid");
            return;
        }

        return Describing.configuration.hashFn(this);
    }

    clone() {
        if (!(Describing.configuration && Describing.configuration.cloneFn)) {
            console.warn("Describing.clone(): cloneFn configuration missing");
            return;
        }
        if (!(typeof Describing.configuration.cloneFn == "function" || Describing.configuration.cloneFn instanceof Function)) {
            console.warn("Describing.clone(): cloneFn configuration invalid");
            return;
        }

        return Describing.configuration.cloneFn(this);
    }

    static isArrayOf = function(obj) { return Utilities.isArrayOfType(obj, this); }
}

export default Describing;
