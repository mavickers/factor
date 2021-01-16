import PipelineFilter from "./PipelineFilter";
import Utilities from "../../Utilities";

class Pipeline {
    #filters = [];
    #current = 0;

    constructor(...filters) {
        filters.forEach(filter => (filter instanceof PipelineFilter || Object.getPrototypeOf(filter) === PipelineFilter) && this.#filters.push(filter));

        return this;
    }

    get count() {
        return this.#filters.length;
    }

    execute(args, callback) {
        while (this.#current < this.count && !args.isAborted) {
            const filter = new this.#filters[this.#current++]();

            args.addFilterResult(filter.name, filter.execute(args));
        }

        Utilities.isFunction(callback) && callback(args);

        return args;
    }
}

export default Pipeline;
