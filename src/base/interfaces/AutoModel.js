import { Configurable, StandardModel, Utilities } from "../../factor";

const primitiveTypes = [ Boolean, Number, String ];

const configFn = function(model) {
    console.log("configFn");

    if (!(typeof model == "function" || model instanceof Function) || model.isConfigured) return false;

    console.log("CONFIGURING");

    const instance = new model();
    const props = Object.getOwnPropertyNames(instance);
    const _config = { type: null, required: false, default: null };

    props.forEach(prop => {
        if (!(typeof prop == "object" || prop instanceof Object)) return;
        if (prop.hasOwnProperty("type") && Utilities.isFunction(instance["type"])) _config["type"] = instance["type"];
        if (prop.hasOwnProperty("required") && typeof instance["required"] === "boolean") _config["required"] = instance["required"];
        if (prop.hasOwnProperty("default")) _config["default"] = instance["default"];
    });

    Object.defineProperty(model, "_config", { get: () => _config });

    console.log(props);
    console.log(instance instanceof AutoModel);

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
        //configFn(this);
    }
}

export default AutoModel;
