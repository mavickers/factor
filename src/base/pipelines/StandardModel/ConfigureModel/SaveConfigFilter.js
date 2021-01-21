import PipelineFilter from "../../../components/Pipeline/PipelineFilter";

export default class SaveConfigFilter extends PipelineFilter {
    constructor() {
        super((data) => {
            data.model.configure(data.config);
            data.model.sealConfiguration();

            return true;
        });
    }
}
