import StandardModel from "./StandardModel";
import Utilities from "../Utilities";
import Classes from "../Classes";

const configFn = function(model) {
    if (!(typeof model == "function" || model instanceof Function) || model.isConfigured) return false;

    const instance = new model();
    const propNames = Object.getOwnPropertyNames(instance);
    const methods = model._inherited.instanceMethods;
    const _config = { fieldDefs: { }, isMisconfigured: false };

    // iterate through the fields, parse and build the configs
    propNames.filter(prop => !methods.includes(prop)).forEach(propName => {
        const propConfig = { type: null, required: false, default: null, value: null };
        const prop = instance[propName];

        if (!(typeof prop == "object" || prop instanceof Object)) return;
        if (prop.hasOwnProperty("type") && (fieldTypes.includes(prop["type"]) || fieldTypes.includes(Object.getPrototypeOf(prop["type"])))) propConfig["type"] = prop["type"];

        // if the type parameter was not valid there is not point in adding this
        // field to the config - throw a warning but continue, misconfigurations
        // can be handled by the consumer.
        if (propConfig["type"] == null) {
            console.warn(`Model configuration: field '${propName}' in model '${model.name}' does not contain valid configuration`);
            _config.isMisconfigured = true;

            return;
        }

        _config.fieldDefs[propName] = prop;
    });

    // now store it in the model prototype
    Object.seal(_config);
    Object.defineProperty(model, "_config", { get: () => _config });

    return true;
}

class AutoModel extends StandardModel {
    #test;

    constructor(obj) {
        // todo: figure out how to disable the constructor and force
        //       usage of create(); the SO article below is a bit convoluted
        //       but a Proxy or class wrapper may be the answer.
        //       https://stackoverflow.com/questions/21667149/how-to-define-private-constructors-in-javascript

        // todo: also consider migrating create() to eventual
        //       repo-enabled class

        super(obj);

        // this.#test = "hello";
        // const test1 = "goodbye";
        // console.log(eval("\"" + this.#test + "\""));
        // console.log(this.#test);

        const modelChild = Utilities.getChildClass(this)
        const modelParent = Utilities.getParentClass(this);

        Classes.addInheritance(modelChild, modelParent);
    }

    static create(...args) {
        this.configure(this, configFn);

        const model = this;
        const instance = new this(model);
        const methods = model._inherited.instanceMethods;
        const propNames = Object.getOwnPropertyNames(instance);
        const config = model._config;
        const initialVals = (typeof args === "object" || args instanceof Object) && args || { };

        //iterate through the fields, replace with getter/setters, set default values
        propNames.filter(prop => !methods.includes(prop)).forEach(propName =>  {
            delete instance[propName];

            if (!config?.fieldDefs?.[propName] ?? false) return;

            const fieldDef = config?.fieldDefs?.[propName] ?? null;
            const fieldValDefault = fieldDef.default || (fieldDef.type == Boolean ? false : null);
            const privateFieldName = `#${propName}`;
            const readOnly = (fieldDef?.readOnly ?? false) || false;

            // this may not work, will have to define a private obj on the instance that contains
            // the actual field vals.
            let field = eval("\"" + `this.#${propName}` + "\"");

            const fieldVals = { };

            // console.log(propName);
            // console.log(fieldDef);
            // console.log(fieldDef.default);
            // console.log(fieldDef.type);
            // console.log(fieldValDefault);
            //
            if (fieldDef.type === Boolean) {
                Object.defineProperty(instance, propName, {
                    get: function() { return fieldVals[propName]; },
                    set: function(value) { fieldVals[propName] = (typeof value === "boolean" || value instanceof Boolean) && value; }
                });
            }
            if (fieldDef.type === Number) {
                Object.defineProperty(instance, propName, {
                    get: function() { return fieldVals[propName]; },
                    set: function(value) { fieldVals[propName] = (typeof value === "number" || value instanceof Number) && value || null; }
                });
            }
            if (fieldDef.type === Object) {
                // console.log("Object.defineProperty " + propName);
                // console.log(field);

                Object.defineProperty(instance, propName, {
                    get: function() { return fieldVals[propName]; },
                    ...(readOnly && { set: function(value) { fieldVals[propName] = Utilities.isObject(value) && value || null; }})
                });
                // console.log(instance.data);
            }
            if (fieldDef.type === String) {
                Object.defineProperty(instance, propName, {
                    get: function() { return fieldVals[propName]; },
                    ...(readOnly && { set: function(value) { fieldVals[propName] = (typeof value === "string" || value instanceof String) && value.trim() || null; }})
                });
            }

            // console.log(instance);
            instance[propName] = fieldValDefault;
        });

        // iterate through the arguments and set the values accordingly
        initialVals.forEach(key => instance.hasOwnProperty(key) && (instance[key] = initialVals[key]));

        return Object.seal(instance);
    }
}

const fieldTypes = [ Boolean, Number, String, AutoModel, StandardModel, Object, Error ];

export default AutoModel;
