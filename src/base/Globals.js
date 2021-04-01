// import StandardModel from "./classes/StandardModel";

export default class Globals {
    static get Contexts() {
        const contextId = Symbol.for("@mavickers/factor/contexts");

        if (!(global[contextId] && global[contextId] instanceof WeakMap)) global[contextId] = new WeakMap();

        return global[contextId];
    }

    static get Factor() {
        const factorId = Symbol.for("@mavickers/factor");

        if (!global[factorId]) global[factorId] = { };

        return global[factorId];
    }

    static get FieldTypes() {
        const obj = {
            Array: { type: Array, name: "object" },
            Boolean: { type: Boolean, name: "boolean" },
            Date: { type: Date, name: "number" },
            Number: { type: Number, name: "number" },
            Object: { type: Object, name: "object" },
            // StandardModel: { type: StandardModel, name: "object" },
            String: { type: String, name: "string" }
        }

        Object.defineProperty(obj, "allNames", { get: () => [...new Set(Object.keys(obj).map(k => obj[k].name))] });
        Object.defineProperty(obj, "allTypes", { get: () => Object.keys(obj).map(k => obj[k].type) });

        obj.includes = (type) => obj.allTypes.includes(type) || obj.allTypes.includes(Object.getPrototypeOf(type));

        return obj;
    }

    static get Primitives() { return [
        { name: "bigint", type: BigInt },
        { name: "boolean", type: Boolean },
        { name: "number", type: Number },
        { name: "string", type: String },
        { name: "symbol", type: Symbol }
    ]};
}

Globals.Factor["logMute"] = false;
Globals.Factor["logErrorStack"] = false;
