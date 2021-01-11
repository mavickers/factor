import AutoModel from "../../classes/AutoModel";

class PipelineArgs extends AutoModel {
    input = { type: Object, required: true, default: { } };
    error = { type: Error, required: false };
    meta = { type: Object, required: false, default: { } };
}

export default PipelineArgs;
