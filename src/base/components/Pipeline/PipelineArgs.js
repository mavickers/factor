import Utilities from "../../Utilities";

class PipelineArgs {
    data;
    #error;
    #meta;

    constructor(data) {
        const self = this;

        this.data = Utilities.isObject(data) && data || { };
        this.#error = null;
        this.#meta = { abort: false, filters: [ ] };
    }

    get isAborted() {
        return this.#meta?.abort ?? false;
    }

    get error() {
        //return Utilities.copyAndSeal(this.#error);
        return this.#error;
    }

    set error(msg) {
        this.#error = Utilities.isString(msg) && msg.trim() && Error(msg.trim()) || this.#error;
    }

    get meta() {
        return Utilities.copyAndSeal(this.#meta);
    }

    static create(obj) {
        return new this(obj);
    }
}

export default PipelineArgs;
