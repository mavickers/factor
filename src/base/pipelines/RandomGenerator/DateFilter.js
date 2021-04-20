import { PipelineFilter } from "../../components/Pipeline";

export default class DateFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            if (!data) throw Error("DateFilter: data parameter is invalid");
            if (data.targetType.type !== Date) return;

            data.targetValue = data.generateDate();

            this.abort();
        });
    }
}
