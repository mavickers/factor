// Classes.js
// Mimics the ability to inherit multiple classes in js.
// usage: class ClassName extends Classes([ Class1, Class2 ]) { }
//        Classes.addInheritance(baseClass, newClass)
// concept lifted from: https://stackoverflow.com/questions/29879267/es6-class-multiple-inheritance

// todo: write tests for this

const Mixin = function (...classes) {
    if (classes.length === 0) return undefined;
    if (classes.length === 1) return classes[0];

    const addInheritance = function(targetClass, sourceClass, instanceMethods, staticMethods) {
        if (!(typeof targetClass == "function" || targetClass instanceof Function)) return;
        if (instanceMethods && !Array.isArray(instanceMethods)) return;
        if (staticMethods && !Array.isArray(staticMethods)) return;

        instanceMethods = instanceMethods || Object.getOwnPropertyNames(sourceClass.prototype).filter(prop => prop !== "constructor");
        staticMethods = staticMethods || Object.getOwnPropertyNames(sourceClass).filter(prop => ![ "length", "name", "prototype" ].includes(prop));

        targetClass._inherited = targetClass._inherited ?? { classes: [], classNames: [], instanceMethods: [], staticMethods: [] };

        if (!targetClass._inherited.classes.includes(sourceClass)) targetClass._inherited.classes.push(sourceClass);
        if (!targetClass._inherited.classNames.includes(sourceClass.name)) targetClass._inherited.classNames.push(sourceClass.name);

        instanceMethods.forEach(prop => !targetClass._inherited.instanceMethods.includes(prop) && targetClass._inherited.instanceMethods.push(prop));
        staticMethods.forEach(prop => !targetClass._inherited.staticMethods.includes(prop) && targetClass._inherited.staticMethods.push(prop));
    }

    const addMethods = function(targetClass, sourceClass) {
        if (!(typeof targetClass == "function" || targetClass instanceof Function)) return;
        if (!(typeof sourceClass == "function" || sourceClass instanceof Function)) return;

        let instanceMethods = Object.getOwnPropertyNames(sourceClass.prototype).filter(prop => prop !== "constructor");
        let staticMethods = Object.getOwnPropertyNames(sourceClass).filter(prop => ![ "length", "name", "prototype" ].includes(prop));

        if (targetClass._inherited && Array.isArray(targetClass._inherited.classes) && targetClass._inherited.classes.includes(sourceClass)) return;

        // this copies instance properties over
        instanceMethods.forEach(prop => Object.defineProperty(targetClass.prototype, prop, Object.getOwnPropertyDescriptor(sourceClass.prototype, prop)));
        // this copies static properties over
        staticMethods.forEach(prop => Object.defineProperty(targetClass, prop, Object.getOwnPropertyDescriptor(sourceClass, prop)));

        addInheritance(targetClass, sourceClass, instanceMethods, staticMethods);
    }



    classes.filter(cls => cls != classes[0]).forEach(cls => addMethods(classes[0], cls));


    // class NewBase {
    //     constructor() {
    //         classes.forEach(cls => Object.assign(this, new cls()));
    //     }
    // }
    //
    //
    // return NewBase;

    return classes[0];
}

export default Mixin;
