import StandardModel from "./classes/StandardModel";

export default class Globals {
    static get FieldTypes() {
        const obj = {
            Array: { type: Array, name: "object" },
            Boolean: { type: Boolean, name: "boolean" },
            Date: { type: Date, name: "number" },
            Number: { type: Number, name: "number" },
            Object: { type: Object, name: "object" },
            StandardModel: { type: StandardModel, name: "object" },
            String: { type: String, name: "string" }
        }

        Object.defineProperty(obj, "allNames", { get: () => [...new Set(Object.keys(obj).map(k => obj[k].name))] });
        Object.defineProperty(obj, "allTypes", { get: () => Object.keys(obj).map(k => obj[k].type) });

        obj.includes = (type) => obj.allTypes.includes(type) || obj.allTypes.includes(Object.getPrototypeOf(type));

        return obj;
    }

    static get Primitives() { return [
        { name: "boolean", type: Boolean },
        { name: "number", type: Number },
        { name: "string", type: String }
        // not going to support bigint at this time
        // { name: "bigint", type: BigInt },
        // not going to support symbol at this time
        // { name: "symbol", type: Symbol }
    ]};
}
