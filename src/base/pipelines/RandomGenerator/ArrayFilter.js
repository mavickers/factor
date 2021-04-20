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

            const { getRandom } = Utilities;
            const fns = [
                () => getRandom(BigInt),
                () => getRandom(Boolean),
                () => getRandom(Date),
                () => getRandom(Number),
                () => getRandom(String),
                () => getRandom(Symbol)
            ];

            const array = [];
            const cols = Math.floor(Math.random() * 10) + 1
            const rows = Math.floor(Math.random() * 10) + 1
            const types = [ ...Array(cols) ].map(() => Math.floor(Math.random() * fns.length));

            for(let r = 0; r < rows; r++) array.push(types.map(type => fns[type]()));

            data.targetValue = array;

            this.abort();
        });
    }
}
