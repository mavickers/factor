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
import TypeMismatchSetOptions from "../flags/TypeMismatchSetOptions";

export const mismatchConfig = Symbol.for("@mavickers/factor/@onTypeMismatch");

export default function(mismatchFlag) {
    const flag = new TypeMismatchSetOptions(mismatchFlag)

    if (flag.value === 0) throw Error("@onTypeMismatch invalid argument")

    let decorator, onField, targetName, value;

    const init = (target, name, descriptor) => {
        const recipient = descriptor || target;

        onField = descriptor && true || false;
        targetName = onField ? name : target.name;
        decorator = { target, name, descriptor };
        recipient[mismatchConfig] = flag;

        return recipient;
    };
    const getter = () => value;
    const setter = (newValue) => {
        if (!onField) throw Error("@onTypeMismatch.setter invoked on class " + targetName + " (that should never happen)");

        return value = newValue;
    }

    return new Decorator({
        name: "@onTypeMismatch",
        init: init,
        get: getter,
        set: setter
    });
}
