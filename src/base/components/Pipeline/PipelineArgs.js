import { AutoModel } from "../../../factor";

class PipelineArgs extends AutoModel {
    input = { type: Object, required: true };
    error = { type: Error, required: false };
    meta = { type: Object, required: false, default: { } };
}
