import { Configurable, StandardModel, Utilities } from "../../factor";

const primitiveTypes = [ Boolean, Number, String ];

const configFn = function(model) {
    console.log("configFn");

    if (!(typeof model == "function" || model instanceof Function) || model.isConfigured) return false;

    console.log("CONFIGURING");

    const instance = new model();
    const propNames = Object.getOwnPropertyNames(instance);
    const _config = { fieldDefs: { }, isMisconfigured: false };

    // iterate through the fields, parse and build the configs
    propNames.forEach(propName => {
        const propConfig = { type: null, required: false, default: null, value: null };
        const prop = instance[propName];

        if (!(typeof prop == "object" || prop instanceof Object)) return;
        if (prop.hasOwnProperty("type") && Utilities.isFunction(prop["type"])) propConfig["type"] = prop["type"];

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
    Object.freeze(_config);
    Object.defineProperty(model, "_config", { get: () => _config });

    // console.log(props);
    // console.log(instance instanceof AutoModel);

    // const instance = new model();
    //
    // if (!(instance instanceof AutoModel)) return false;

    //
    // console.log(props);

    return true;
}

class AutoModel extends Configurable {
    constructor(obj) {
        super(obj);
    }

    static new() {
        this.configure({ "One": "1" }, configFn);

        const model = this;
        const instance = new this(model);
        const propNames = Object.getOwnPropertyNames(instance);
        const config = model._config;

        //iterate through the fields, replace with getter/setters
        propNames.forEach(propName =>  {
            delete instance[propName];
            if (!(config.fieldDefs[propName])) return;
            
            let field = this[`#${propName}`];

            if (config.fieldDefs[propName].type === Boolean) {
                Object.defineProperty(instance, propName, {
                    get: function() { return field; },
                    set: function(value) { field = typeof value === "boolean" && value; }
                });
            }
            if (config.fieldDefs[propName].type === Number) {
                Object.defineProperty(instance, propName, {
                    get: function() { return field; },
                    set: function(value) { field = (typeof value === "number" || value instanceof Number) && value || null; }
                });
            }
            if (config.fieldDefs[propName].type === String) {
                Object.defineProperty(instance, propName, {
                    get: function() { return field; },
                    set: function(value) { field = (typeof value === "string" || value instanceof String) && value.trim() || null; }
                });
            }
        });

        console.log(Object.getOwnPropertyNames(instance));

        return instance;
    }
}

export default AutoModel;
