import Logger from "../Logger/Logger";
import { copyAndSeal } from "../../Utilities/objects";
import { isString } from "../../Utilities/strings";
import { isType } from "../../Utilities/types";
import { newUuid } from "../../Utilities/uuid";

class PipelineArgs {
    data;
    #error;
    #logger;
    #meta;

    constructor(...args) {
        this.data = args.filter(arg => !isType(arg, Logger));
        this.#error = null;
        this.#meta = { abort: false, abortedWith: null, filters: [ ], executionId: newUuid().split("-").slice(-1)[0], messages: [ ] };
        this.#logger = args.filter(arg => isType(arg, Logger)).slice(-1)[0] || new Logger();
    }

    abort(obj) {
        this.#meta.abort = true;
        this.#meta.abortedWith = obj;
    }

    addFilterResult(filterName, value) {
        this.#meta.filters.push({ name: filterName, result: value });
    }

    get isAborted() {
        return this.#meta?.abort ?? false;
    }

    get error() {
        return this.#error;
    }

    set error(err) {
        this.#error =
            isString(err) && err.trim() && Error(err.trim()) ||
            err instanceof Error && err ||
            this.#error;
    }

    get logger() {
        return this.#logger;
    }

    // get logger() {
    //     const self = this;
    //     const location = Location.locate(2);
    //     const id = Utilities.newUuid().split("-").slice(-1);
    //
    //     console.log(id);
    //
    //     return {
    //         get formattedLogs() { return self.#logger.formattedLogs() },
    //         log: function(...args) { return self.#logger.log(`${self.#meta.executionId} pipeline executionId ${id}`, ...args, location) }
    //     }
    // }

    get meta() {
        return copyAndSeal(this.#meta);
    }
}

export default PipelineArgs;
