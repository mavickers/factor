import AutoModel from "../../interfaces/AutoModel";

class PipelineArgs extends AutoModel {
    input = { type: Object, required: true };
    error = { type: Error, required: false };
    meta = { type: Object, required: false };
}

export default PipelineArgs;