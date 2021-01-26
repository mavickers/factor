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

        // keep the result separate from the args.data assignment below
        // so we're able to indicate that the result had a value or was
        // null when returning.
        const results = this.#processFn(pipelineArgs.data, pipelineArgs.logger) || null;

        // if a result is returned from the filter the the arguments data
        // property is replaced with these results; this allows modification
        // of the data property by a filter (do not return anything) or
        // replacement of the data property altogether (return something);
        this.#pipelineArgs.data = results || this.#pipelineArgs.data;

        return results;
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
