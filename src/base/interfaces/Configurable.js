import Utilities from "../Utilities";

class Configurable {
    static get isConfigured() {
        return this.hasOwnProperty("_config");
    }

    static get configuration() {
        return this._config;
    }

    static configure = function(fn) {
        const configFn = Utilities.isFunction(fn) && fn || standardConfigFn;

        return configFn(this);
    }
}

const standardConfigFn = function(obj, config) {
    if (obj.hasOwnProperty("_config")) return false;

    Object.defineProperty(obj, "_config", { get: () => config });

    return true;
}

export default Configurable;
