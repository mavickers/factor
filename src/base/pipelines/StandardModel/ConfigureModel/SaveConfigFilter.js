import PipelineFilter from "../../../components/Pipeline/PipelineFilter";

export default class SaveConfigFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            logger.log("SaveConfigFilter");

            data.config.initializing = false;
            data.model.configure(data.config);
            data.model.sealConfiguration();

            return data;
        });
    }
}
