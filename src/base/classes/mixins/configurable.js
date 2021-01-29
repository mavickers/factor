import Mixin from "../Mixin";
import Utilities from "../../Utilities";

const configKey = Symbol("configuration");

const obj = {
    get isConfigured() {
        return this.hasOwnProperty(configKey) && Object.isFrozen(this._config);
    },

    get configuration() {
        return this._config;
    },

    configure(...args) {
        if (this.isConfigured) return;

        const standardConfigFn = function(obj, config) {
            const setConfig = obj.hasOwnProperty(configKey) && Utilities.mergeToNew(obj._config, config) || config;

            obj._config = setConfig;

            return true;
        }
        const configFn = args.find(arg => Utilities.isFunction(arg)) || standardConfigFn;
        const config = args.find(arg => !Utilities.isFunction(arg)) || { };

        return configFn(this, config);
    },

    sealConfiguration() {
        if (Object.isSealed(this) || Object.isSealed(this._config)) return;

        const config = this.hasOwnProperty(configKey) && this._config || { };

        delete this._config
        Object.freeze(config);
        Object.defineProperty(this, "_config", { get: () => config });

        return true;
    }

}

export default new Mixin(obj, true);
