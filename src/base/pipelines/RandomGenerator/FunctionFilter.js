import { PipelineFilter } from "../../components/Pipeline";
import Utilities from "../../Utilities";

export default class FunctionFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            if (!data) throw Error("FunctionFilter: data parameter is invalid");
            if (data.targetType.type !== Function) return;

            // randomly returns an anonymous function, named function,
            // arrow function or Function instance.

            const { getRandomInt } = Utilities;
            const fns = [ () => { }, function() { }, function f() { }, new Function() ];

            data.targetValue = fns[getRandomInt(0, 3)];

            this.abort();
        });
    }
}
