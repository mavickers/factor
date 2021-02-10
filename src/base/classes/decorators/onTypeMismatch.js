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
import Utilities from "../../Utilities";

const { spread } = Utilities;

export const mismatchConfig = Symbol.for("@mavickers/factor/@onTypeMismatch");

export default function(mismatchFlag) {
    const flag = new TypeMismatchSetOptions(mismatchFlag);

    if (flag.value === 0) throw Error("@onTypeMismatch invalid argument")

    let decorator, value;

    // const init = (target, name, descriptor) => descriptor ? descriptor[mismatchConfig] = flag : target[mismatchConfig] = flag;
    const init = (...args) => {
        decorator = spread(args, [ "target", "name", "descriptor" ]);
        decorator.descriptor ? decorator.descriptor[mismatchConfig] = flag : decorator.target[mismatchConfig] = flag;
        console.log("@onTypeMismatch init", decorator);
        // console.log(descriptor ? "setting field " + descriptor[mismatchConfig].value : "setting class");
    }
    const getter = () => value;
    // const setter = (newValue) => value = newValue;
    const setter = (newValue) => {
        console.log("@onTypeMismatch setter", decorator);

        return value = newValue;
    }

    return new Decorator({
        name: "@onTypeMismatch",
        init: init,
        get: getter,
        set: setter
    });
}
