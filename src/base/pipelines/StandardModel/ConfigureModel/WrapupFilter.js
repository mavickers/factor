import { PipelineFilter } from "../../../components/Pipeline";
import Extensions from "../../../Extensions";

export default class WrapupFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            logger.log("WrapupFilter").log(...(this.error && [ "error thrown", this.error ] || []));

            logger.flush()
        })
    }
}
