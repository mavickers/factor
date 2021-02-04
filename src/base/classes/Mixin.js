// Mixin.js
// Support for copying functionality from one object to another.
// Idea lifted from http://raganwald.com/2015/06/26/decorators-in-es7.html
// todo: write more tests for this

const configId = Symbol.for("@mavickers/factor/Mixin");

const Mixin = function (...classes) {
    if (classes.length === 0) return undefined;
    if (classes.length === 1) return classes[0];

    const addInheritance = function(targetClass, sourceClass, instanceMethods, staticMethods) {
        if (!(typeof targetClass == "function" || targetClass instanceof Function)) return;
        if (instanceMethods && !Array.isArray(instanceMethods)) return;
        if (staticMethods && !Array.isArray(staticMethods)) return;

        instanceMethods = instanceMethods || Object.getOwnPropertyNames(sourceClass.prototype).filter(prop => prop !== "constructor");
        staticMethods = staticMethods || Object.getOwnPropertyNames(sourceClass).filter(prop => ![ "length", "name", "prototype" ].includes(prop));

        targetClass[configId] = targetClass[configId] ?? { classes: [], classNames: [], instanceMethods: [], staticMethods: [] };

        if (!targetClass[configId].classes.includes(sourceClass)) targetClass[configId].classes.push(sourceClass);
        if (!targetClass[configId].classNames.includes(sourceClass.name)) targetClass[configId].classNames.push(sourceClass.name);

        instanceMethods.forEach(prop => !targetClass[configId].instanceMethods.includes(prop) && targetClass[configId].instanceMethods.push(prop));
        staticMethods.forEach(prop => !targetClass[configId].staticMethods.includes(prop) && targetClass[configId].staticMethods.push(prop));

        if (sourceClass[configId]) {
            targetClass[configId].classes = [ ...sourceClass[configId].classes, ...targetClass[configId].classes];
            targetClass[configId].classNames = [ ...sourceClass[configId].classNames, ...targetClass[configId].classNames];
            targetClass[configId].instanceMethods = [ ...sourceClass[configId].instanceMethods, ...targetClass[configId].instanceMethods];
            targetClass[configId].staticMethods = [ ...sourceClass[configId].staticMethods, ...targetClass[configId].staticMethods];
        }
    }

    const addMethods = function(targetClass, sourceClass) {
        if (!(typeof targetClass == "function" || targetClass instanceof Function)) return;
        if (!(typeof sourceClass == "function" || sourceClass instanceof Function)) return;

        let instanceMethods = Object.getOwnPropertyNames(sourceClass.prototype).filter(prop => prop !== "constructor");
        let staticMethods = Object.getOwnPropertyNames(sourceClass).filter(prop => ![ "length", "name", "prototype" ].includes(prop));

        if (targetClass[configId] && Array.isArray(targetClass[configId].classes) && targetClass[configId].classes.includes(sourceClass)) return;

        // this copies instance properties over
        instanceMethods.forEach(prop => Object.defineProperty(targetClass.prototype, prop, Object.getOwnPropertyDescriptor(sourceClass.prototype, prop)));
        // this copies static properties over
        staticMethods.forEach(prop => Object.defineProperty(targetClass, prop, Object.getOwnPropertyDescriptor(sourceClass, prop)));

        addInheritance(targetClass, sourceClass, instanceMethods, staticMethods);
    }

    classes.filter(cls => cls !== classes[0]).forEach(cls => addMethods(classes[0], cls));

    return classes[0];
}

Object.defineProperty(Mixin, "configId", { get: () => configId });

export default Mixin;
