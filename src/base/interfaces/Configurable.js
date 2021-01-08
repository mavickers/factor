import { Utilities } from "../../factor";

const standardConfigFn = function(obj, config) {
    if (obj.hasOwnProperty("_config")) return false;

    Object.defineProperty(obj, "_config", { get: () => config });

    return true;
}

class Configurable {
    constructor(obj) {

    }

    static get isConfigured() {
        return this.hasOwnProperty("_config");
    }

    static get configuration() {
        return this._config;
    }

    static configure(config, fn) {
        const configFn = Utilities.isFunction(fn) && fn || standardConfigFn;

        return configFn(this, config);
    }
}

export default Configurable;
