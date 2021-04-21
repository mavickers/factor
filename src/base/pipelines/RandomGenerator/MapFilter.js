import { PipelineFilter } from "../../components/Pipeline";
import Utilities from "../../Utilities";

export default class MapFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            if (!data) throw Error("MapFilter: data parameter is invalid");
            if (data.targetType.type !== Map) return;

            // generates a map with a random number of string keys/values;
            // max of 100 items in the map.

            const map = new Map();
            const { getRandom } = Utilities;
            let items = getRandom({ type: Number, min: 1, max: 100 });

            while (items-- > 0) map.set(getRandom({ type: String }), getRandom({ type: String }));

            data.targetValue = map;

            this.abort();
        });
    }
}
