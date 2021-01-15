import AutoModel from "../../classes/AutoModel";

class PipelineArgs extends AutoModel {
    data = { type: Object, default: { } };
    error = { type: Error };
    meta = { type: Object, default: { } };

    get isAborted() {
        return this.meta?.abort ?? false;
    }
}

export default PipelineArgs;
