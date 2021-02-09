import Utilities from "../Utilities";

const configId = Symbol.for("@mavickers/factor/Decorator");

export default class {
    constructor(args) {
        let _initialValue, _value;
        const decoratorName = args.name || `decorator ${Utilities.newUuidShort()}`;
        const baseInit = args.init?.bind(args) ?? (() => undefined);
        const baseGetter = args.get?.bind(args) ?? (() => _value);
        const baseSetter = args.set?.bind(args) ?? ((newValue) => _value = newValue);
        const fieldsOnly = args.fieldsOnly === true || false;
        const classOnly = args.classOnly === true || false;

        const baseClassInit = function(target, name, descriptor) {
            // we may jam something in here at a later time
        };
        const baseFieldInit = function(target, name, descriptor) {
            if (!descriptor) return undefined;

            const prevSetter = descriptor.set || ((newValue) => newValue);
            const setter = (newValue) => _value = baseSetter(Utilities.valueOrDefault(prevSetter(newValue), newValue));

            setter(_initialValue);

            return {
                configurable: Utilities.isNotNil(args.configurable) ? args.configurable : descriptor.configurable,
                enumerable: Utilities.isNotNil(args.enumerable) ? args.enumerable : descriptor.enumerable,
                get: baseGetter,
                set: setter
            };
        }

        const decorator = function(target, name, descriptor) {
            fieldsOnly && classOnly && throw Error(`Decorator ${decoratorName} has invalid configuration - fieldsOnly and classOnly both set to true`);
            fieldsOnly && !descriptor && throw Error(`Decorator '${decoratorName}' can only be applied to class fields`);
            classOnly && descriptor && throw Error(`Decorator '${decoratorName}' can only be applied to classes`);

            baseInit(target, name, descriptor);

            // no descriptor means we are applying the decorator to a class
            if (!descriptor) return baseClassInit(target, name, descriptor);

            // we're dealing with a field, so determine and set the initial
            // value of the field before calling baseFieldInit and returning
            _initialValue = descriptor.initializer ? descriptor.initializer() : (descriptor.value || (descriptor.get && descriptor.get()));

            return baseFieldInit(target, name, descriptor);
        }

        // Because js modules cache instantiated objects each decorator module should be
        // a function that instantiates the Decorator class inside of it. For decorators
        // that do not take arguments (such as @readOnly) the custom is to add a decorator
        // property to the constructor arguments; if the constructor here sees those
        // parameters it will return the results of the executed decorator function.
        //
        // For decorators that take arguments (such as @is) the function will not be the
        // decorator function, so this constructor will return a decorator function.

        return args.decorator && decorator(args.decorator.target, args.decorator.name, args.decorator.descriptor) || decorator;
    }

    static get configId() { return configId; }
}
