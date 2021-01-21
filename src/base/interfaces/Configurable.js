import Utilities from "../Utilities";

class Configurable {
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
    //const setConfig = obj.hasOwnProperty("_config") && { ...obj._config, ...config } || config;
    const setConfig = obj.hasOwnProperty("_config") && Utilities.merge(obj._config, config) || config;
    // console.log(obj._config);

    obj._config = setConfig;

    // if (obj.hasOwnProperty("_config")) return false;
    //
    // Object.defineProperty(obj, "_config", { get: () => config });

    return true;
}

export default Configurable;
