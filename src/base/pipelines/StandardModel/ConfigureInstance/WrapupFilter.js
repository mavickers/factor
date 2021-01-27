import { PipelineFilter } from "../../../components/Pipeline";

export default class WrapupFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            logger.log("WrapupFilter", this.error);

            if (!data || !data.instance) return;

            //data.instance[data.propName] = data.fieldValDefault;
        });
    }
}
