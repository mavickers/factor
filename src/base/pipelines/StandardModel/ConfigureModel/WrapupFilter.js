import { PipelineFilter } from "../../../components/Pipeline";
import Extensions from "../../../Extensions";

export default class WrapupFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            logger.log("WrapupFilter", this.error);

            logger.flush()
        })
    }
}
