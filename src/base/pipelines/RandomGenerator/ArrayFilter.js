import { PipelineFilter } from "../../components/Pipeline";
import Utilities from "../../Utilities";

export default class ArrayFilter extends PipelineFilter {
constructor() {
        super((data, logger) => {
            if (!data) throw Error("ArrayFilter: data parameter is invalid");
            if (data.targetType.type !== Array) return;


            // generates a random-sized, two-dimensional array with
            // primitive types and a few structural types; size ranges
            // from 1x1 to 10x10.

            const { getRandom, getRandomInt } = Utilities;
            const fns = [
                () => getRandom({ type: BigInt }),
                () => getRandom({ type: Boolean }),
                () => getRandom({ type: Date }),
                () => getRandom({ type: Number }),
                () => getRandom({ type: String }),
                () => getRandom({ type: Symbol })
            ];

            const array = [];
            const cols = getRandomInt(1, 10);
            const rows = getRandomInt(1, 10);
            const types = [ ...Array(cols) ].map(() => getRandomInt(0, fns.length - 1));

            for(let r = 0; r < rows; r++) array.push(types.map(type => fns[type]()));

            data.targetValue = array;

            this.abort();
        });
    }
}
