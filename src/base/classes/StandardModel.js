import Utilities from "../Utilities";
import Classes from "../Classes";
import Configurable from "../interfaces/Configurable";
import Describable from "../interfaces/Describable";
import Mappable from "../interfaces/Mappable";
import { PipelineArgs } from "../components/Pipeline";
import processFieldsPipeline from "./pipelines";

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

class StandardModel extends Classes([ Configurable, Describable, Mappable ]) {
    constructor(obj) {
        // todo: figure out how to disable the constructor and force
        //       usage of create(); the SO article below is a bit convoluted
        //       but a Proxy or class wrapper may be the answer.
        //       https://stackoverflow.com/questions/21667149/how-to-define-private-constructors-in-javascript

        // todo: also consider migrating create() to eventual
        //       repo-enabled class

        super(obj);

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

        const pipelineArgs = new PipelineArgs({
            instance: new this(model),
            config: model._config,
            initialVals: (typeof args === "object" || args instanceof Object) && args || { }
        });
        const pipeline = new Pipelin

        propNames.filter(prop => !methods.includes(prop)).forEach(propName => {
            pipelineArgs.propName = propName;
            processFieldsPipeline.execute(pipelineArgs);
        })

        // iterate through the fields, replace with getter/setters, set default values
        propNames.filter(prop => !methods.includes(prop)).forEach(propName => {
            delete instance[propName];

            if (!config?.fieldDefs?.[propName] ?? false) return;

            const fieldDef = config?.fieldDefs?.[propName] ?? null;
            const fieldValDefault = fieldDef.default || (fieldDef.type == Boolean ? false : null);
            const readOnly = (fieldDef?.readOnly ?? false) || false;
            const fieldVals = { };

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
                Object.defineProperty(instance, propName, {
                    get: function() { return fieldVals[propName]; },
                    ...(!readOnly && { set: function(value) { fieldVals[propName] = Utilities.isObject(value) && value || null; }})
                });
            }
            if (fieldDef.type === String) {
                Object.defineProperty(instance, propName, {
                    get: function() { return fieldVals[propName]; },
                    ...(!readOnly && { set: function(value) { fieldVals[propName] = (typeof value === "string" || value instanceof String) && value.trim() || null; }})
                });
            }

            instance[propName] = fieldValDefault;
        });

        // iterate through the arguments and set the values accordingly
        initialVals.forEach(key => instance.hasOwnProperty(key) && (instance[key] = initialVals[key]));

        return Object.seal(instance);
    }
}

const fieldTypes = [ Boolean, Number, String, StandardModel, StandardModel, Object, Error ];

export default StandardModel;
