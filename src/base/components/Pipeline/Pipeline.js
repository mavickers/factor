import PipelineFilter from "./PipelineFilter";
import Utilities from "../../Utilities";

const isFilter = (obj) => obj && (obj instanceof PipelineFilter || Object.getPrototypeOf(obj) === PipelineFilter);

class Pipeline {
    #filters = [];
    #finally;
    #current = 0;

    constructor(...filters) {
        this.filterWith(...filters);

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
        this.#current = 0;
        let lastResult;

        while (this.#current < this.count && !args.isAborted) {
            const filter = new this.#filters[this.#current++]();

            args.addFilterResult(filter.name, filter.execute(args));
        }

        isFilter(this.#finally) && args.addFilterResult(this.#finally.name, new this.#finally().execute(args));
        Utilities.isFunction(callback) && callback(args);

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
