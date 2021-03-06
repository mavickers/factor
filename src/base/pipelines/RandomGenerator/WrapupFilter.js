import { PipelineFilter } from "../../components/Pipeline";

export default class WrapupFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            logger.log(
                "WrapupFilter",
                `aborted with: ${this.abortedWith || "n/a"}`,
                `errored with: ${this.error || "n/a"}`
            );
        });
    }
}
