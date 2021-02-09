/*
 *  onTypeMismatch.js
 *  Configures how a field or class will respond to a type mismatch.
 *
 *  NOTE THIS IS A STAGE 1 DECORATOR, DOES NOT CONFORM TO STAGE 2
 *  reason: https://github.com/babel/babel/issues/12654
 *  spec: https://github.com/tc39/proposal-decorators
 *  implementation: https://babeljs.io/docs/en/babel-plugin-proposal-decorators
 *
 */

import Decorator from "../Decorator";

export default function(mismatchFlag) {
    let decorator, value;

    const init = (target, name, descriptor) => decorator = { target: target, name: name, descriptor: descriptor };
    const getter = () => value;
    const setter = (newValue) => value = newValue;

    return new Decorator({
        name: "@onTypeMismatch",
        init: init,
        get: getter,
        set: setter
    });
}
