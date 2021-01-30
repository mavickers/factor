import Utilities from "../Utilities";

const configId = Symbol("configuration");

class Configurable {
    static get isFrozen() {
        return this.hasOwnProperty(configId) && Object.isFrozen(this[configId]);
    }

    static get configuration() {
        return this[configId] || { };
    }

    static configure = function(...args) {
        if (this.isFrozen) throw new Error("Configuration is frozen");

        const configFn = args.find(arg => Utilities.isFunction(arg)) || standardConfigFn;
        const config = args.find(arg => !Utilities.isFunction(arg)) || { };

        return configFn(this, config);
    }

    static sealConfiguration = function() {
        if (Object.isSealed(this) || Object.isSealed(this[configId])) return;

        const config = this.hasOwnProperty(configId) && this[configId] || { };

        delete this[configId]
        Object.freeze(config);
        Object.defineProperty(this, configId, { get: () => config });

        return true;
    }
}

const standardConfigFn = function(obj, config) {
    const setConfig = obj.hasOwnProperty(configId) && Utilities.mergeToNew(obj[configId], config) || config;

    obj[configId] = setConfig;

    return true;
}

export default Configurable;
