import { PipelineFilter } from "../../components/Pipeline";

export default class BigIntFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            if (!data) return this.abort("data parameter is invalid");
            if (data.targetType.type !== BigInt) return;

            const numbers = [..."0123456789"];
            const digits = Math.floor(Math.random() * 64) + 1
            let numberString = "";

            while(numberString.length < digits) numberString += numbers[Math.floor(Math.random() * 10)];

            data.targetValue = BigInt(numberString);
        });
    }
}
