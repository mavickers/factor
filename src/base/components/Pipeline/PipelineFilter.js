import Utilities from "../../Utilities";

class PipelineFilter {
    #name;
    #pipelineArgs;
    #next;
    #callback;

    #processFn = function(data) { return null };

    constructor(processFn) {
        this.#name = Utilities.getChildClass(this).name;
        this.#processFn = (typeof processFn === "function" || processFn instanceof Function) && processFn || this.#processFn;
    }

    abort() {
        this.#pipelineArgs.abort();
    }

    get name() { return this.#name; }

    execute = function(pipelineArgs, next, callback) {
        if (!Utilities.isFunction(next)) throw new Error("PipelineFilter.execute(): 'pipelineArgs' parameter is invalid");

        this.#pipelineArgs = pipelineArgs;
        this.#next = next;
        this.#callback = callback;

        const isAsync = typeof callback === "function" || callback instanceof Function;

        if (!pipelineArgs?.isAborted ?? true)
            this.#pipelineArgs.meta.filters.push({ name: this.#name, result: this.#processFn(pipelineArgs) });

        pipelineArgs.addFilterResult(this.#processFn(pipelineArgs.data));

        if (isAsync) next(pipelineArgs, callback);
        else return next(pipelineArgs);
    }
}

export default PipelineFilter
