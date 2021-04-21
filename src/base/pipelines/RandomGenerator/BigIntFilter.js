import { PipelineFilter } from "../../components/Pipeline";
import Utilities from "../../Utilities";

export default class BigIntFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            if (!data) throw Error("BigIntFilter: data parameter is invalid");
            if (data.targetType.type !== BigInt) return;

            // this will create a string using max of 64 digits
            // and then create a positive BigInt value from the result.

            const { getRandom } = Utilities;
            const numbers = [..."0123456789"];
            const digits = getRandom({ type: Number, min: 1, max: 64});
            let numberString = "";

            while(numberString.length < digits) numberString += numbers[getRandom({ type: Number, min: 0, max: 9 })];

            data.targetValue = BigInt(numberString);

            this.abort();
        });
    }
}
