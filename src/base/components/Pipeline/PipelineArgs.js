import AutoModel from "../../classes/AutoModel";

class PipelineArgs extends AutoModel {
    data = { type: Object, required: true, default: { } };
    error = { type: Error, required: false };
    #meta = { type: Object, required: false, default: { } };

    get isAborted() {
        return this.#meta?.abort ?? false;
    }
}

export default PipelineArgs;
