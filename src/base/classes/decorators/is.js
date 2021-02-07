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

export default function(type) {
    const targetType =
        (Globals.Primitives.find(prim => prim.name === type || prim.type === type) && type) ||
        (Utilities.isClass(type) && type) ||
        undefined;

    if (!targetType) throw Error(`@is(): specified type must be a supported primitive or class`);

    let _value;

    const getter = function() { return _value; };
    const setter = function(value) {
        // we aren't handling null/undefined here, that's a job for @required
        if (value === undefined || value === null) return _value = value;
        if (Utilities.isType(value, targetType)) return _value = value;

        throw Error(`Incorrect value type specified for ${name}`);
    };

    return function(target, name, descriptor) {
        if (!descriptor) throw Error("@is() can only be applied to class fields with descriptors");

        descriptor.initializer && setter(descriptor.initializer());

        return {
            configurable: descriptor.configurable,
            enumerable: descriptor.enumerable,
            get: getter,
            set: setter
        }
    }
}
