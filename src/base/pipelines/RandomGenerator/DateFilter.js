import { PipelineFilter } from "../../components/Pipeline";

export default class DateFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            if (!data) throw Error("DateFilter: data parameter is invalid");
            if (data.targetType.type !== Date) return;

            // generates a random date between 1/1/1900 and the current date

            const start = new Date("1/1/1900");

            data.targetValue = new Date(start.getTime() + Math.random() * (Date.now() - start.getTime()));

            this.abort();
        });
    }
}
