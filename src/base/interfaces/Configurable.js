import Utilities from "../Utilities";

const configurableId = Symbol("configurable");

class Configurable {
    static get configurableId() { return configurableId; }

    static get isConfigured() {
        return this.hasOwnProperty(configurableId) && Object.isFrozen(this[configurableId]);
    }

    static get configuration() {
        return this[configurableId] || { };
    }

    static configure = function(...args) {
        if (this.isConfigured) return;

        const configFn = args.find(arg => Utilities.isFunction(arg)) || standardConfigFn;
        const config = args.find(arg => !Utilities.isFunction(arg)) || { };

        return configFn(this, config);
    }

    static sealConfiguration = function() {
        if (Object.isSealed(this) || Object.isSealed(this[configurableId])) return;

        const config = this.hasOwnProperty(configurableId) && this[configurableId] || { };

        delete this[configurableId]
        Object.freeze(config);
        Object.defineProperty(this, configurableId, { get: () => config });

        return true;
    }
}

const standardConfigFn = function(obj, config) {
    const setConfig = obj.hasOwnProperty(configurableId) && Utilities.mergeToNew(obj[configurableId], config) || config;

    obj[configurableId] = setConfig;

    return true;
}

export default Configurable;
