import { PipelineFilter } from "../../components/Pipeline";

export default class FunctionFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            if (!data) throw Error("FunctionFilter: data parameter is invalid");
            if (data.targetType.type !== Function) return;

            // randomly returns an anonymous function, named function,
            // arrow function or Function instance.

            const fns = [ () => { }, function() { }, function f() { }, new Function() ];

            data.targetValue = fns[Math.floor(Math.random() * 4)];

            this.abort();
        });
    }
}
