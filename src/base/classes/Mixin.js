export default class {
    constructor(behavior, isShared = false) {
        const keys = Reflect.ownKeys(behavior);
        const type = Symbol("isa");

        const mixin = function(targetClass) {
            if (isShared) return targetClass;

            keys.forEach(property => Object.defineProperty(targetClass.prototype, property, { value: behavior[property], writable: true }));
            Object.defineProperty(targetClass.prototype, type, { value: true });

            return targetClass;
        }

        if (!isShared) return mixin;

        keys.forEach(property => Object.defineProperty(mixin, property, { value: behavior[property], enumerable: behavior.propertyIsEnumerable(property) }));
        Object.defineProperty(mixin, Symbol.hasInstance, { value: (i) => !!i[type] });

        console.log(mixin);

        return mixin;
    }
}
