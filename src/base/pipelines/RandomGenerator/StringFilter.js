import { PipelineFilter } from "../../components/Pipeline";

export default class StringFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            if (!data) return this.abort("data parameter is invalid");
            if (data.targetType.type !== String) return;

            data.targetValue = data.generateString();
        });
    }
}
