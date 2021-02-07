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

let _targetType;
let _value;

const getter = function() { return _value; };
const setter = function(value) {
    console.log("is() setter");
    // we aren't handling null/undefined here, that's a job for @required
    if (value === undefined || value === null) return _value = value;
    if (Utilities.isType(value, _targetType)) return _value = value;

    throw Error(`Incorrect value type specified for ${name}`);
};

export default function(type) {
    _targetType =
        (Globals.Primitives.find(prim => prim.name === type || prim.type === type) && type) ||
        (Utilities.isClass(type) && type) ||
        undefined;

    if (!_targetType) throw Error(`@is(): specified type must be a supported primitive or class`);

    return function(target, name, descriptor) {
        console.log("is() init", descriptor);

        if (!descriptor) throw Error("@is() can only be applied to class fields with descriptors");

        descriptor.initializer && setter(descriptor.initializer());

        return {
            ...descriptor,
            get: getter,
            set: setter
        }
    }
}
