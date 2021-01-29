import { Configurable, Utilities } from "../../factor";

export default class extends Configurable {
    configurable = false;
    enumerable = false;
    writable = true;

    #configuration = { };

    constructor(args) {
        super();

        if (!args) return;

        this.configurable = Utilities.isBoolean(args.configurable) ? args.configurable : this.configurable;
        this.enumerable = Utilities.isBoolean(args.enumerable) ? args.enumerable : this.enumerable;
        this.value = args.value;
        this.writable = Utilities.isBoolean(args.writable) ? args.writable : this.writable;

        if (args.value) this.value = args.value;
        if (Utilities.isFunction(args.get)) this.get = args.get;
        if (Utilities.isFunction(args.set)) this.set = args.set;

        if (Utilities.isFunction(args.initializer)) this.intializer = args.initializer;

        this.#configuration = args.configuration || { };
    }

    configure(key, value) {
        this.#configuration[key] = value;
    }
    get configuration() {
        return this.#configuration;
    }
}
