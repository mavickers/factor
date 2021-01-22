import Utilities from "../../Utilities";

class PipelineFilter {
    #name;
    #pipelineArgs;
    #processFn = function(data) { return null };

    constructor(processFn) {
        this.#name = Utilities.getClass(this).name;
        this.#processFn = processFn;
    }

    abort(obj) {
        return this.#pipelineArgs.abort(obj);
    }

    get name() { return this.#name; }

    execute = function(pipelineArgs) {
        this.#pipelineArgs = pipelineArgs;

        return this.#processFn(pipelineArgs.data) || null;
    }

    get processor() {
        return this.#processFn;
    }

    set processor(processFn) {
        this.#processFn = (typeof processFn === "function" || processFn instanceof Function) && processFn || this.#processFn;
    }
}

export default PipelineFilter
