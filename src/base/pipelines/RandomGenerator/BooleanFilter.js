import { PipelineFilter } from "../../components/Pipeline";

export default class BooleanFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            if (!data) return this.abort("data parameter is invalid");
            if (data.targetType.type !== Boolean) return;

            data.targetValue = data.generateBoolean();
        });
    }
}
