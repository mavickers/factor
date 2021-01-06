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

    bases.forEach(base => {
        // this copies instance properties over
        Object.getOwnPropertyNames(base.prototype)
            .filter(prop => prop != 'constructor')
            .forEach(prop => Object.defineProperty(Bases.prototype, prop, Object.getOwnPropertyDescriptor(base.prototype, prop)));

        // this copies static properties over
        for (let key in base) {
            Bases[key] = base[key];
        }
    });

    return Bases;
}
