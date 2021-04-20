import { PipelineFilter } from "../../components/Pipeline";
import Utilities from "../../Utilities";

export default class SetFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            if (!data) throw Error("SetFilter: data parameter is invalid");
            if (data.targetType.type !== Set) return;

            // generates a set with a random number of primitives;
            // max of 100 items in the set.

            const set = new Set();
            const { getRandom } = Utilities;
            const types = [ Array, BigInt, Boolean, Date, Number, String, Symbol ];
            const type = () => types[Math.floor(Math.random() * types.length)];
            let items = Math.floor(Math.random() * 100) + 1;

            while (items-- > 0) set.add(getRandom(type()));

            data.targetValue = set;

            this.abort();
        });
    }
}
