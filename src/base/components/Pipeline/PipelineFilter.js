import Utilities from "../../Utilities";

class PipelineFilter {
    #name;
    #pipelineArgs;
    #next;
    #callback;

    #processFn = function(data) { return null };

    constructor(processFn) {
        this.#name = Utilities.getChildClass(this).name;
        this.processor = processFn;
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

        const isAsync = Utilities.isFunction(callback);

        !pipelineArgs.isAborted && pipelineArgs.addFilterResult(this.#name, this.#processFn(pipelineArgs.data));

        if (isAsync) next(pipelineArgs, callback);
        else return next(pipelineArgs);
    }

    get processor() {
        return this.#processFn();
    }

    set processor(processFn) {
        this.#processFn = (typeof processFn === "function" || processFn instanceof Function) && processFn || this.#processFn;
    }
}

export default PipelineFilter
