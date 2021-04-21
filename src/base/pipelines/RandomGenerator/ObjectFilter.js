import { PipelineFilter } from "../../components/Pipeline";
import Utilities from "../../Utilities";

export default class ArrayFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            if (!data) throw Error("ArrayFilter: data parameter is invalid");
            if (data.targetType.type !== Object) return;

            // generates a random-sized object with single dimension
            // key:value properties; keys are strings, values are
            // primitives; size ranges from one key to 100.

            const { getRandom } = Utilities;
            const fns = [
                () => getRandom(BigInt),
                () => getRandom(Boolean),
                () => getRandom(Date),
                () => getRandom(Number),
                () => getRandom(String),
                () => getRandom(Symbol)
            ];

            const obj = { };
            const keys = Math.floor(Math.random() * 100) + 1;

            for(let r = 0; r < keys; r++) obj[getRandom(String)] = fns[Math.floor(Math.random() * fns.length)]();

            data.targetValue = obj;

            this.abort();
        });
    }
}
