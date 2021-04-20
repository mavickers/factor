import { PipelineFilter } from "../../components/Pipeline";

export default class StringFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            if (!data) throw Error("StringFilter: data parameter is invalid");
            if (data.targetType.type !== String) return;

            data.targetValue = data.generateString();

            this.abort();
        });
    }
}
