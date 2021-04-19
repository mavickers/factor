import { PipelineFilter } from "../../components/Pipeline";

export default class BigIntFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            if (!data) return this.abort("data parameter is invalid");
            if (data.targetType.type !== BigInt) return;

            // this will create a string using max of 64 digits
            // and then create a positive BigInt value from the result.

            data.targetValue = data.generateBigInt();
        });
    }
}
