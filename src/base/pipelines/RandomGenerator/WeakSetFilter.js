import { PipelineFilter } from "../../components/Pipeline";
import Utilities from "../../Utilities";

export default class WeakSetFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            if (!data) throw Error("WeakSetFilter: data parameter is invalid");
            if (data.targetType.type !== WeakSet) return;

            // generates a set with a random number of primitives;
            // max of 100 items in the set.

            const set = new WeakSet();
            const { getRandom, getRandomInt } = Utilities;
            const types = [ Array, BigInt, Boolean, Date, Number, String, Symbol ];
            const type = () => types[getRandomInt(0, types.length - 1)];
            let items = getRandomInt(1, 100);

            while (items-- > 0) set.add({ [items]: getRandom({ type: type() }) });

            data.targetValue = set;

            this.abort();
        });
    }
}
