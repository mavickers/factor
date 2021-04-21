/*
 *  getClass(obj)
 *  - obj: instantiated object
 *
 *  Returns the class/function that the instantiated object belongs to; use-
 *  case is for inside of a parent class where you want to know the extending
 *  class.
 *
 */
const getClass = (obj) => obj && Object.getPrototypeOf(obj).constructor || undefined;
const getClassName = function(obj) { return getClass(obj).name; };
const getClassName = function(obj) { return getClass(obj).name; };

export { getClass, getClassName };
export default { getClass, getClassName };
