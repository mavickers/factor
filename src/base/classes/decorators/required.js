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

import Decorator from "../Decorator";
import Utilities from "../../Utilities";

let value, fieldName;

const init = (target, name, descriptor) => fieldName = name;
const getter = () => value;
const setter = (newValue) => Utilities.hasValue(newValue)
        ? value = newValue
        : throw Error(`Value required for ${ fieldName }`);

export default new Decorator({ name: "@readOnly", get: getter, set: setter, init: init, fieldsOnly: true });
