import Utilities from "../../Utilities";

class PipelineArgs {
    data;
    #error;
    #meta;

    constructor(...args) {
        const self = this;

        //this.data = Utilities.isObject(data) && data || { };
        // let the consumer parse out data as it sees fit
        this.data = args;
        this.#error = null;
        this.#meta = { abort: false, abortedWith: null, filters: [ ] };
    }

    abort(obj) {
        this.#meta.abort = true;
        this.#meta.abortedWith = obj;
    }

    addFilterResult(filterName, value) {
        this.#meta.filters.push({ name: filterName, result: value });
    }

    get isAborted() {
        return this.#meta?.abort ?? false;
    }

    get error() {
        return this.#error;
    }

    set error(msg) {
        this.#error = Utilities.isString(msg) && msg.trim() && Error(msg.trim()) || this.#error;
    }

    get meta() {
        return Utilities.copyAndSeal(this.#meta);
    }
}

export default PipelineArgs;
