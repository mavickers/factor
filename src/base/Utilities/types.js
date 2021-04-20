import Globals from "../Globals";

const isType = (obj, type) => {
    if (obj === null || obj === undefined || type === null || type === undefined) return false;
    if (typeof type == "string") return typeof obj === type;
    if (obj instanceof type) return true;
    if (Globals.Primitives.find(p => p.type === type) && typeof obj === type.name.toLowerCase()) return true;

    return false;
}

export { isType };
export default { isType };
