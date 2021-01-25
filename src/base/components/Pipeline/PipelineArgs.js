import Utilities from "../../Utilities";

class PipelineArgs {
    data;
    #error;
    #meta;

    constructor(...args) {
        const self = this;

        //this.data = Utilities.isObject(data) && data || { };
        // let the consumer parse out data as it sees fit
        this.data = args;
        this.#error = null;
        this.#meta = { abort: false, abortedWith: null, filters: [ ], executionId: Utilities.newUuid(), messages: [ ] };
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

    set error(msg) {
        this.#error = Utilities.isString(msg) && msg.trim() && Error(msg.trim()) || this.#error;
    }

    message(msg) {
        this.#meta.messages.push(msg);
    }

    get messages() {
        const objects = this.#meta.messages.map(msg => !Utilities.isString(msg));
        let output = "";

        this.#meta.messages.forEach(msg => {
            output += `\r\n${msg.id} ${msg.name}\r\n`;
            output += Utilities.isString(msg.message) && msg.message && `${msg.message}` || "";
            output += !Utilities.isString && `%O` || "";
        });

        return [ output, objects ];
    }

    get meta() {
        return Utilities.copyAndSeal(this.#meta);
    }
}

export default PipelineArgs;
