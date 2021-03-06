// Classes.js
// A syntactic shortcut mimicking the ability to inherit multiple classes
// in by calling Mixing function.
//
// usage: class ClassName extends Classes([ Class1, Class2 ]) { }

import Mixin from "./classes/Mixin";

const Classes = function (...oldBases) {
    class NewBase {
        constructor() {
            oldBases.forEach(oldBase => Object.assign(this, new oldBase()));
        }
    }

    return Mixin(...[class { }, ...oldBases]);
    //
    // oldBases.forEach(oldBase => Classes.addMethods(NewBase, oldBase));
    //
    // return NewBase;
}

// Classes.addMethods = function(newBase, oldBase) {
//     if (!(typeof newBase == "function" || newBase instanceof Function)) return;
//     if (!(typeof oldBase == "function" || oldBase instanceof Function)) return;
//
//     let instanceMethods = Object.getOwnPropertyNames(oldBase.prototype).filter(prop => prop !== "constructor");
//     let staticMethods = Object.getOwnPropertyNames(oldBase).filter(prop => ![ "length", "name", "prototype" ].includes(prop));
//
//     if (newBase._inherited && Array.isArray(newBase._inherited.classes) && newBase._inherited.classes.includes(oldBase)) return;
//
//     // this copies instance properties over
//     instanceMethods.forEach(prop => Object.defineProperty(newBase.prototype, prop, Object.getOwnPropertyDescriptor(oldBase.prototype, prop)));
//     // this copies static properties over
//     staticMethods.forEach(prop => Object.defineProperty(newBase, prop, Object.getOwnPropertyDescriptor(oldBase, prop)));
//
//     Classes.addInheritance(newBase, oldBase, instanceMethods, staticMethods);
// }
//
// Classes.addInheritance = function(newBase, oldBase, instanceMethods, staticMethods) {
//     if (!(typeof newBase == "function" || newBase instanceof Function)) return;
//     if (instanceMethods && !Array.isArray(instanceMethods)) return;
//     if (staticMethods && !Array.isArray(staticMethods)) return;
//
//     instanceMethods = instanceMethods || Object.getOwnPropertyNames(oldBase.prototype).filter(prop => prop !== "constructor");
//     staticMethods = staticMethods || Object.getOwnPropertyNames(oldBase).filter(prop => ![ "length", "name", "prototype" ].includes(prop));
//
//     newBase._inherited = newBase._inherited ?? { classes: [], classNames: [], instanceMethods: [], staticMethods: [] };
//
//     if (!newBase._inherited.classes.includes(oldBase)) newBase._inherited.classes.push(oldBase);
//     if (!newBase._inherited.classNames.includes(oldBase.name)) newBase._inherited.classNames.push(oldBase.name);
//
//     instanceMethods.forEach(prop => !newBase._inherited.instanceMethods.includes(prop) && newBase._inherited.instanceMethods.push(prop));
//     staticMethods.forEach(prop => !newBase._inherited.staticMethods.includes(prop) && newBase._inherited.staticMethods.push(prop));
// }

export default Classes;
