import Utilities from "../../Utilities";
import PipelineFilter from "./PipelineFilter";

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

    abort() {
        this.#meta.abort = true;
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
