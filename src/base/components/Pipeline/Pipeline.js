import { PipelineArgs, PipelineFilter } from "./";
import Utilities from "../../Utilities";

const isFilter = (obj) => obj && (obj instanceof PipelineFilter || Object.getPrototypeOf(obj) === PipelineFilter);
const { isFunction, isType, newUuid } = Utilities;

class Pipeline {
    #executionId;
    #filters = [];
    #finally;
    #current = 0;

    constructor(...filters) {
        this.filterWith(...filters);

        this.#executionId = newUuid().split("-").slice(-1);

        return this;
    }

    get count() {
        return this.#filters.length;
    }

    static create() {
        return new Pipeline();
    }

    static createWith(...filters) {
        return new Pipeline(...filters);
    }

    execute(args, callback) {
        if (!isType(args, PipelineArgs)) throw new Error("Pipeline.execute(): invalid PipelineArgs argument");

        this.#current = 0;
        let lastResult, pipelineArgs;

        while (this.#current < this.count && !args.isAborted && !args.error) {
            const filter = new this.#filters[this.#current++]();

            try {
                args.addFilterResult(filter.name, filter.execute(args));
            }
            catch (err) {
                args.error = err;
            }

        }

        isFilter(this.#finally) && args.addFilterResult(this.#finally.name, new this.#finally().execute(args));
        isFunction(callback) && callback(args);

        return args;
    }

    filterWith(...filters) {
        filters.forEach(filter => isFilter(filter) && this.#filters.push(filter));

        return this;
    }

    finishWith(filter) {
        this.#finally = isFilter(filter) && filter || this.#finally;

        return this;
    }
}

export default Pipeline;
