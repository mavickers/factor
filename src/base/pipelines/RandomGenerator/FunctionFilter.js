import { PipelineFilter } from "../../components/Pipeline";

export default class FunctionFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            if (!data) throw Error("DateFilter: data parameter is invalid");
            if (data.targetType.type !== Function) return;

            // generates a random date between 1/1/1900 and the current date

            const fns = [ () => { }, function() { }, function f() { }, new Function() ];

            data.targetValue = fns[Math.floor(Math.random() * 4)];

            this.abort();
        });
    }
}
