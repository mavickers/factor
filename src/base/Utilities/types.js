import Globals from "../Globals";

const allTypes = [...Globals.Primitives, ...Globals.Structurals ];

const getType = (obj) => {
    const objTypeString = Object.prototype.toString.call(obj);
    const types = allTypes.filter(t => t.signature === objTypeString);

    return types && types.length === 1 && types[0].type || undefined;
};

const isType = (obj, type) => {
    // this compares on a strict basis - anything that can return true
    // as typeof Object (such as Array and other structures) will return
    // false here.

    if (obj === null || obj === undefined || type === null || type === undefined) return false;
    if (typeof type == "string") return typeof obj === type;
    if (allTypes.find(t => t.type === type && Object.prototype.toString.call(obj) === t.signature)) return true;
    console.log(1);
    //if (Globals.Primitives.find(p => p.type === type) && typeof obj === type.name.toLowerCase()) return true;
    if (type !== Object && obj instanceof type) return true;

    return false;
}

export { getType, isType };
export default { getType, isType };
