import Utilities from "../../Utilities";

class PipelineFilter {
    #name;
    #pipelineArgs;
    #processFn = function(data) { return null };

    constructor(processFn) {
        this.#name = Utilities.getChildClass(this).name;
        this.processor = processFn;
    }

    abort() {
        this.#pipelineArgs.abort();
    }

    get name() { return this.#name; }

    execute = function(pipelineArgs) {
        this.#pipelineArgs = pipelineArgs;

        return !pipelineArgs.isAborted && this.#processFn(pipelineArgs.data) || null;
    }

    get processor() {
        return this.#processFn();
    }

    set processor(processFn) {
        this.#processFn = (typeof processFn === "function" || processFn instanceof Function) && processFn || this.#processFn;
    }
}

export default PipelineFilter
