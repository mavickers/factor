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
    if (!target || Utilities.isClass(target) || !descriptor) return target;
    if (!descriptor.initializer) throw Error(`Value required for ${name}`);

    let _value = descriptor.initializer();

    return {
        configurable: descriptor.configurable,
        enumerable: descriptor.enumerable,
        get: () => _value,
        set: (value) => {
            _value = value || throw Error(`Value required for ${name}`);
        }

    }
}
