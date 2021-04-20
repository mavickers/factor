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
            String: { type: String, name: "string" }
        }

        Object.defineProperty(obj, "allNames", { get: () => [...new Set(Object.keys(obj).map(k => obj[k].name))] });
        Object.defineProperty(obj, "allTypes", { get: () => Object.keys(obj).map(k => obj[k].type) });

        obj.includes = (type) => obj.allTypes.includes(type) || obj.allTypes.includes(Object.getPrototypeOf(type));

        return obj;
    }

    static get Primitives() { return [
        { name: "bigint", type: BigInt, signature: "[object BigInt]" },
        { name: "boolean", type: Boolean, signature: "[object Boolean]" },
        { name: "number", type: Number, signature: "[object Number]" },
        { name: "string", type: String, signature: "[object String]" },
        { name: "symbol", type: Symbol, signature: "[object Symbol]" }
    ]};

    static get Structurals() { return [
        { name: "array", type: Array, signature: "[object Array]" },
        { name: "date", type: Date, signature: "[object Date]" },
        { name: "function", type: Function, signature: "[object Function]" },
        { name: "map", type: Map, signature: "[object Map]" },
        { name: "object", type: Object, signature: "[object Object]" },
        { name: "set", type: Set, signature: "[object Set]" },
        { name: "weakmap", type: WeakMap, signature: "[object WeakMap]" },
        { name: "weakset", type: WeakSet, signature: "[object WeakSet]" }
    ]};
}

Globals.Factor["logMute"] = false;
Globals.Factor["logErrorStack"] = false;
