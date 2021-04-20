import { PipelineFilter } from "../../components/Pipeline";

export default class NumberFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            if (!data) throw Error("NumberFilter: data parameter is invalid");
            if (data.targetType.type !== Number) return;

            data.targetValue = data.generateNumber();

            this.abort();
        });
    }
}
