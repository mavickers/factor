/*
 *  is.js
 *  Restricts a field so that it can only be assigned a specified
 *  type of value.
 *
 *  NOTE THIS IS A STAGE 1 DECORATOR, DOES NOT CONFORM TO STAGE 2
 *  reason: https://github.com/babel/babel/issues/12654
 *  spec: https://github.com/tc39/proposal-decorators
 *  implementation: https://babeljs.io/docs/en/babel-plugin-proposal-decorators
 *
 */

import Utilities from "../../Utilities";
import Globals from "../../Globals";
import Decorator from "../Decorator";
import TypeMismatchSetOptions from "../flags/TypeMismatchSetOptions";
import { mismatchConfig } from "./onTypeMismatch";

const { isClass, isNil, isType } = Utilities;

export default function(type) {
    let decorator, value,
        targetType =
            (Globals.Primitives.find(prim => prim.name === type || prim.type === type) && type) ||
            (isClass(type) && type) ||
            throw Error(`@is(): specified type must be a supported primitive or class`);

    const init = (target, name, descriptor) => {
        if (!descriptor) throw Error("@is.init descriptor missing, possibly due to applying @is on a class (that should not happen)");

        decorator = { target, name, descriptor };

        return descriptor;
    }
    const getter = function() { return value; };
    const setter = function(newValue) {
        // we aren't handling null/undefined here, that's a job for @required
        if (isNil(newValue)) return value = newValue;
        // the type matches, so go ahead and assign the value and return
        if (isType(newValue, targetType)) return value = newValue;

        // if we have a descriptor and there is mismatchConfig on it, use
        // that; if not check for mismatchConfig on the class that the field is
        // attached to (the class itself, not the instance); if that fails then
        // we fallback to using Throw; remember that since we're running the setter
        // in a property context we want to check the mismatchConfig on the target
        // constructor rather than the target itself as the target in a property
        // context will be the instance of class and not the class itself.

        const mismatchFlag =
            (decorator && decorator.descriptor && decorator.descriptor[mismatchConfig]) ||
            (decorator && decorator.target && decorator.target.constructor[mismatchConfig]) ||
            new TypeMismatchSetOptions("Throw");

        // now let's do it

        if (mismatchFlag.equals("Ignore")) return value = newValue;
        if (mismatchFlag.equals("Noop")) return value = value;
        if (mismatchFlag.equals("Null")) return value = null;

        // we're here either because the flag is set to throw or there were no flags
        // set, which means this is the default when all else fails

        throw Error(`Incorrect value type specified for ${ decorator.name }`);
    };

    return new Decorator({
        name: "@is",
        init: init,
        get: getter,
        set: setter,
        fieldsOnly: true
    });
}
