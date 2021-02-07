/*
 *  required.js
 *  Restricts a field so that its value cannot be changed.
 *
 *  NOTE THIS IS A STAGE 1 DECORATOR, DOES NOT CONFORM TO STAGE 2
 *  reason: https://github.com/babel/babel/issues/12654
 *  spec: https://github.com/tc39/proposal-decorators
 *  implementation: https://babeljs.io/docs/en/babel-plugin-proposal-decorators
 *
 */

import Utilities from "../../Utilities";

export default function(target, name, descriptor) {
    if (!descriptor) throw Error("@readOnly can only be applied to class fields with descriptors");
    if (!target || Utilities.isClass(target) || !descriptor) return target;
    if (!descriptor.initializer) throw Error(`Value required for ${name}`);

    let _value = descriptor.initializer();
    const getter = function() { return _value; };
    const setter = function(value) { value !== null && value !== undefined && (_value = value) || throw Error(`Value required for ${name}`); }

    return {
        configurable: descriptor.configurable,
        enumerable: descriptor.enumerable,
        get: getter,
        set: setter
    }
}
