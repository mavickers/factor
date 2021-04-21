/*
 *  getClass(obj)
 *  - obj: instantiated object
 *
 *  Returns the class/function that the instantiated object belongs to; use-
 *  case is for inside of a parent class where you want to know the extending
 *  class.
 *
 */

import Globals from "../Globals";
import { getType } from "./types";

const allTypes = [...Globals.Primitives, ...Globals.Structurals ];

const getClass = (obj) => obj && Object.getPrototypeOf(obj).constructor || undefined;
const getClassName = function(obj) { return getClass(obj).name; };
const isClass = (obj) => {
    // if the string content of the given object satisfies any of these conditions,
    // consider the object as a class:
    // - string starts with "class" (native class declaration)
    // - string contains "_classCallCheck" (babelized class)
    // - string contains "native code" (native object)

    return !allTypes.find(t => t.type === obj) &&
           typeof obj === 'function' && /^\s*class\s+|_classCallCheck|native\scode/.test(obj.toString()) &&
           obj instanceof Function &&
           true;
};
const isClassed = (obj) => {
    if (!obj) return false;

    const className = getClassName(obj);

    return className && !allTypes.find(t => t.type.name === className);
}

export { getClass, getClassName, isClass, isClassed };
export default { getClass, getClassName, isClass, isClassed };
