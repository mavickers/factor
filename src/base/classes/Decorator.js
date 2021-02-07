import Utilities from "../Utilities";

export default class {
    constructor(args) {
        let initValue, value;
        const decoratorName = args.name || `decorator ${Utilities.newUuidShort()}`;
        const baseGetter = args.get.bind(args) || (() => value);
        const baseSetter = args.set.bind(args) || ((newValue) => value = newValue);

        return function(target, name, descriptor) {
            let initializing = true;
            const prevSetter = descriptor.set || function(newValue) { };
            const setter = function(newValue) {
                !initializing && prevSetter(newValue);
                baseSetter(newValue);
            }

            initValue = descriptor.initializer && descriptor.initializer() || descriptor.value || descriptor.get();
            baseSetter(initValue);
            initializing = false;

            return {
                configurable: descriptor.configurable,
                enumerable: descriptor.enumerable,
                get: baseGetter,
                set: setter
            };
        }
    }
}

// const test1 = function(target, name, descriptor) {
//     console.log("@test1 init", descriptor);
//
//     const prevSetter = descriptor.set || function(value) { console.log("@test1 noop setter") };
//     let initializing = true;
//     let _value;
//
//     const getter = function() {
//         console.log("@test1 getter");
//         return _value;
//     };
//     const setter = function(value) {
//         console.log("@test1 setter", prevSetter);
//         !initializing && prevSetter(value);
//         _value = value;
//     }
//
//     let initValue = descriptor.initializer && descriptor.initializer() || descriptor.value || descriptor.get();
//
//     setter(initValue)
//
//     delete descriptor.initializer;
//     delete descriptor.value;
//     delete descriptor.writable;
//
//
//     // when initializing, if there is an initializer on the descriptor
//     // then run it through the setter; if there is not an initializer
//     // but there is a getter, run the value from the descriptor getter
//     // through the setter; the previous getter will be destroyed when init
//     // on the current decorator is complete.
//
//     initializing = false;
//
//     return {
//         ...descriptor,
//         get: getter,
//         set: setter,
//         test1: "123"
//     };
// }
