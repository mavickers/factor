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

    const inherited = { classNames: [], instanceMethods: [], staticMethods: [] };

    bases.forEach(base => {
        const className = base.prototype.constructor.name;

        inherited.classNames.push(className);

        // this copies instance properties over
        Object.getOwnPropertyNames(base.prototype)
            .filter(prop => prop != 'constructor')
            .forEach(prop => {
                Object.defineProperty(Bases.prototype, prop, Object.getOwnPropertyDescriptor(base.prototype, prop));
                inherited.instanceMethods.push(prop);
            });
        // this copies static properties over
        Object.getOwnPropertyNames(base)
            .filter(prop => ![ "length", "name", "prototype" ].includes(prop))
            .forEach(prop => {
                Object.defineProperty(Bases, prop, Object.getOwnPropertyDescriptor(base, prop));
                inherited.staticMethods.push(prop);
            });
    });

    inherited.classNames = Bases._inherited && Array.isArray(Bases._inherited.classNames)
        ? [ ...Bases._inherited, ...inherited.classNames ]
        : inherited.classNames;
    if (Bases._inherited) delete Bases._inherited;
    Object.defineProperty(Bases, "_inherited", { get: () => inherited });

    return Bases;
}
