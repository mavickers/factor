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

let _targetType;
let _value;

const getter = function() { return _value; };
const setter = function(newValue) {
    // we aren't handling null/undefined here, that's a job for @required
    if (newValue === undefined || newValue === null) return _value = newValue;
    if (Utilities.isType(newValue, _targetType)) return _value = newValue;

    throw Error(`Incorrect value type specified for ${name}`);
};

export default function(type) {
    _targetType =
        (Globals.Primitives.find(prim => prim.name === type || prim.type === type) && type) ||
        (Utilities.isClass(type) && type) ||
        throw Error(`@is(): specified type must be a supported primitive or class`);

    return new Decorator({
        name: "@is",
        get: getter,
        set: setter,
        fieldsOnly: true
    });
}
