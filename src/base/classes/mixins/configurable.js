import Mixin from "../Mixin";
import Utilities from "../../Utilities";

const configKey = Symbol("configuration");

const obj = {
    get isConfigured() {
        return this.hasOwnProperty(configKey) && Object.isFrozen(this[configKey]);
    },

    get configuration() {
        console.log("configuration", this.name);
        return this[configKey];
    },

    configure(...args) {
        if (this.isConfigured) return;

        console.log("configure", this.name);

        const standardConfigFn = function(obj, config) {
            const setConfig = obj.hasOwnProperty(configKey) && Utilities.mergeToNew(obj[configKey], config) || config;

            obj[configKey] = setConfig;

            return true;
        }
        const configFn = args.find(arg => Utilities.isFunction(arg)) || standardConfigFn;
        const config = args.find(arg => !Utilities.isFunction(arg)) || { };

        return configFn(this, config);
    },

    sealConfiguration() {
        if (Object.isSealed(this) || Object.isSealed(this[configKey])) return;

        const config = this.hasOwnProperty(configKey) && this[configKey] || { };

        delete this[configKey];
        Object.freeze(config);
        Object.defineProperty(this, configKey, { get: () => config });

        return true;
    }

}

export default Utilities.newMixin(obj, true);
