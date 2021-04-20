import { getClass } from "../../Utilities/classes";
import { isNotNil } from "../../Utilities/nil";

class PipelineFilter {
    #name;
    #pipelineArgs;
    #processFn = function(data) { return null };

    constructor(processFn) {
        this.#name = getClass(this).name;
        this.#processFn = processFn;
    }

    abort(obj) {
        return this.#pipelineArgs.abort(obj);
    }

    get abortedWith() {
        try { return this.#pipelineArgs.meta.abortedWith; } catch { }

        return "Unable to provide abortedWith";
    }

    get name() { return this.#name; }

    get error() {
        return this.#pipelineArgs.error;
    }

    execute = function(pipelineArgs) {
        this.#pipelineArgs = pipelineArgs;

        // keep the result separate from the args.data assignment below
        // so we're able to indicate that the result had a value or was
        // null when returning.

        const results = this.#processFn(pipelineArgs.data, pipelineArgs.logger);

        // if a result is returned from the filter then the arguments data
        // property is replaced with these results; this allows modification
        // of the data property by a filter (do not return anything) or
        // replacement of the data property altogether (return something);
        this.#pipelineArgs.data = isNotNil(results) ? results : this.#pipelineArgs.data;

        return isNotNil(results) ? results : null;
    }

    get executionId() {
        return this.#pipelineArgs.meta.executionId;
        // return this.#name;
    }

    get processor() {
        return this.#processFn;
    }

    set processor(processFn) {
        this.#processFn = (typeof processFn === "function" || processFn instanceof Function) && processFn || this.#processFn;
    }
}

export default PipelineFilter
