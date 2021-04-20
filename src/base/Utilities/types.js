import Globals from "../Globals";

const getType = (obj) => {
    const allTypes = [...Globals.Primitives, ...Globals.Structurals ];
    const objTypeString = Object.prototype.toString.call(obj);
    const types = allTypes.filter(t => t.signature === objTypeString);

    return types && types.length === 1 && types[0].type || undefined;
};

const isType = (obj, type) => {
    if (obj === null || obj === undefined || type === null || type === undefined) return false;
    if (typeof type == "string") return typeof obj === type;
    if (obj instanceof type) return true;
    if (Globals.Primitives.find(p => p.type === type) && typeof obj === type.name.toLowerCase()) return true;

    return false;
}

export { getType, isType };
export default { getType, isType };
