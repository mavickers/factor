import PipelineArgs from "./PipelineArgs";
import Utilities from "../../Utilities";

class PipelineFilter {
    #name;
    #pipelineArgs;
    #next;
    #callback;

    #processFn = function(input) { };

    constructor(processFn) {
        this.#name = Utilities.getChildClass(this).name;
        this.#processFn = (typeof processFn === "function" || processFn instanceof Function) && processFn || this.#processFn;
    }

    get name() { return this.#name; }

    #abort = function() {
        if (!this.#pipelineArgs) this.#pipelineArgs = PipelineArgs.create();
        if (!this.#pipelineArgs.meta) this.#pipelineArgs.meta = { abort: true, filters: [ ] };

        this.#pipelineArgs.meta.abort = true;
    }

    static create = function(processFn) {
        return new this(processFn);
    };

    execute = function(pipelineArgs, next, callback) {
        if (!Utilities.isFunction(next)) throw new Error("PipelineFilter.execute(): 'pipelineArgs' parameter is invalid");

        this.#pipelineArgs = pipelineArgs;
        this.#next = next;
        this.#callback = callback;

        const isAsync = typeof callback === "function" || callback instanceof Function;

        if (!pipelineArgs?.isAborted ?? true)
            this.#pipelineArgs.meta.filters.push({ name: this.#name, result: this.#processFn(pipelineArgs) });

        if (isAsync) next(pipelineArgs, callback);
        else return next(pipelineArgs);
    }
}

export default PipelineFilter
