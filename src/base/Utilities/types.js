import Globals from "../Globals";
import { isClass, isClassed } from "./classes";

const allTypes = [...Globals.Primitives, ...Globals.Structurals ];

const getType = (obj) => {
    const objTypeString = Object.prototype.toString.call(obj);
    const types = allTypes.filter(t => t.signature === objTypeString);

    return types && types.length === 1 && types[0].type || undefined;
};

const isType = (obj, type) => {
    // this compares on a strict basis - anything that can return true
    // as typeof Object (such as Array, other structures and even
    // classes) will return false.

    if (obj === null || obj === undefined || type === null || type === undefined) return false;

    const objIsClassed = isClassed(obj);
    const objSignature = Object.prototype.toString.call(obj);
    const typeIsClass = isClass(type);

    if (typeof type == "string") return typeof obj === type;
    if (objIsClassed || typeIsClass) return type !== Object && obj instanceof type;
    if (allTypes.find(t => t.type === type && objSignature === t.signature)) return true;
    // if (Globals.Primitives.find(p => p.type === type) && typeof obj === type.name.toLowerCase()) return true;
    // if (type !== Object && obj instanceof type) return true;

    return false;
}

export { getType, isType };
export default { getType, isType };
