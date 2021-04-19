import { PipelineFilter } from "../../components/Pipeline";

export default class BigIntFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            if (!data) return this.abort("data parameter is invalid");
            if (data.targetType.type !== Boolean) return;

            data.targetValue = Math.random() < 0.5;
        });
    }
}
