import Utilities from "../Utilities";

class Configurable {
    #propId = Symbol.for("Configurable");

    static get isConfigured() {
        return this.hasOwnProperty("_config") && Object.isFrozen(this._config);
    }

    static get configuration() {
        return this._config;
    }

    static configure = function(...args) {
        if (this.isConfigured) return;

        const configFn = args.find(arg => Utilities.isFunction(arg)) || standardConfigFn;
        const config = args.find(arg => !Utilities.isFunction(arg)) || { };

        return configFn(this, config);
    }

    static sealConfiguration = function() {
        if (Object.isSealed(this) || Object.isSealed(this._config)) return;

        const config = this.hasOwnProperty("_config") && this._config || { };

        delete this._config
        Object.freeze(config);
        Object.defineProperty(this, "_config", { get: () => config });

        return true;
    }
}

const standardConfigFn = function(obj, config) {
    const setConfig = obj.hasOwnProperty("_config") && Utilities.mergeToNew(obj._config, config) || config;

    obj._config = setConfig;

    return true;
}

export default Configurable;
