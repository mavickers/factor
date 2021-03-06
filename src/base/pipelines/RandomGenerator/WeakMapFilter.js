import { PipelineFilter } from "../../components/Pipeline";
import Utilities from "../../Utilities";

export default class WeakMapFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            if (!data) throw Error("WeakMapFilter: data parameter is invalid");
            if (data.targetType.type !== WeakMap) return;

            // generates a weakmap with a random number of object keys
            // with string values; max of 100 items in the weakmap.

            const map = new WeakMap();
            const { getRandom } = Utilities;
            let items = getRandom({ Number, min: 1, max: 100 });

            while (items-- > 0) map.set({ [items]: getRandom({ type: String }) }, getRandom({ type: String }));

            data.targetValue = map;

            this.abort();
        });
    }
}
