// Classes.js
// Mimics the ability to inherit multiple classes in js.
// usage: class ClassName extends Classes([ Class1, Class2 ]) { }
// lifted from: https://stackoverflow.com/questions/29879267/es6-class-multiple-inheritance

export default function (bases) {
    class Bases {
        constructor() {
            bases.forEach(base => Object.assign(this, new base()));
        }
    }

    let classNames = [];

    bases.forEach(base => {
        const className = base.prototype.constructor.name;

        classNames.push(className);

        // this copies instance properties over
        Object.getOwnPropertyNames(base.prototype)
            .filter(prop => prop != 'constructor')
            .forEach(prop => Object.defineProperty(Bases.prototype, prop, Object.getOwnPropertyDescriptor(base.prototype, prop)));
        // this copies static properties over
        Object.getOwnPropertyNames(base)
            .filter(prop => ![ "length", "name", "prototype" ].includes(prop))
            .forEach(prop => Object.defineProperty(Bases, prop, Object.getOwnPropertyDescriptor(base, prop)));
    });

    classNames = Array.isArray(Bases._classes) ? [ ...Bases._classes, ...classNames ] : classNames;
    if (Bases._classes) delete Bases._classes;
    Object.defineProperty(Bases, "_classes", { get: () => classNames });

    return Bases;
}
