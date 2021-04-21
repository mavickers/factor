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
                () => getRandom({ type: BigInt }),
                () => getRandom({ type: Boolean }),
                () => getRandom({ type: Date }),
                () => getRandom({ type: Number }),
                () => getRandom({ type: String }),
                () => getRandom({ type: Symbol })
            ];

            const obj = { };
            const keys = getRandom({ type: Number, min: 1, max: 100 });

            for(let r = 0; r < keys; r++) obj[getRandom(String)] = fns[getRandom({ type: Number, min: 0, max: fns.length - 1 })]();

            data.targetValue = obj;

            this.abort();
        });
    }
}
