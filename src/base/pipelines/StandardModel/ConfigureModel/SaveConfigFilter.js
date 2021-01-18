import PipelineFilter from "../../../components/Pipeline/PipelineFilter";

export default class SaveConfigFilter extends PipelineFilter {
    constructor() {
        super((data) => {
            Object.seal(data.config);
            Object.defineProperty(data.model, "_config", { get: () => data.config });

            return true;
        });
    }
}
