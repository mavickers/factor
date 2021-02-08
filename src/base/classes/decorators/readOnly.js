/*
 *  readOnly.js
 *  Restricts a field so that its value cannot be changed.
 *
 *  NOTE THIS IS A STAGE 1 DECORATOR, DOES NOT CONFORM TO STAGE 2
 *  reason: https://github.com/babel/babel/issues/12654
 *  spec: https://github.com/tc39/proposal-decorators
 *  implementation: https://babeljs.io/docs/en/babel-plugin-proposal-decorators
 *
 */

import Decorator from "../Decorator";

export default function(target, name, descriptor) {
    let fieldName, initializing = true, value;

    return new Decorator({
        name: "@readOnly",
        init: (target, name, descriptor) => fieldName = name,
        get: () => value,
        set: (newValue) => {
            !initializing && throw Error(`Field '${ fieldName }' is read only`);
            value = newValue;
            initializing = false;
        },
        fieldsOnly: true,
        decorator: {
            target: target,
            name: name,
            descriptor: descriptor
        }
    });
}

