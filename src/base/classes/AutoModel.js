import StandardModel from "./StandardModel";

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
    constructor(obj) {
        super(obj);

        const modelChild = Object.getPrototypeOf(this).constructor;
        const modelConfig = modelChild._config;
        const modelName = modelChild.name;
    }

    setValue = function(prop, value) {
        if (this.hasOwnProperty(prop)) this[prop] = value;
        else console.warn(`AutoModel.setValue(): property ${prop} does not exist`);

        return this;
    }

    static create(...args) {
        this.configure(this, configFn);

        const model = this;
        const instance = new this(model);
        const methods = model._inherited.instanceMethods;
        const propNames = Object.getOwnPropertyNames(instance);
        const config = model._config;

        //iterate through the fields, replace with getter/setters
        propNames.filter(prop => !methods.includes(prop)).forEach(propName =>  {
            delete instance[propName];
            if (!(config.fieldDefs[propName])) return;

            let field = this[`#${propName}`];
            //const pipelineArgs = PipelineArgs.new({ input: { field: this[`#${propName}`], config: config, propName: propName }})

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
                    set: function(value) { console.log("set"); field = (typeof value === "string" || value instanceof String) && value.trim() || null; }
                });
            }
        });

        return Object.seal(instance);
    }
}

const fieldTypes = [ Boolean, Number, String, AutoModel, StandardModel ];

// add AutoModel details to _inheritance
if (!AutoModel._inherited) AutoModel._inherited = { }
AutoModel._inherited.classNames = AutoModel._inherited.classNames || [];
AutoModel._inherited.instanceMethods = AutoModel._inherited.instanceMethods || [];
AutoModel._inherited.staticMethods = AutoModel._inherited.staticMethods || [];
AutoModel._inherited.classNames.push("AutoModel");
AutoModel._inherited.instanceMethods.push("setValue");
AutoModel._inherited.staticMethods.push("new");

export default AutoModel;
