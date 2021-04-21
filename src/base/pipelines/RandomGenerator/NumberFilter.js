import { PipelineFilter } from "../../components/Pipeline";

export default class NumberFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            if (!data) throw Error("NumberFilter: data parameter is invalid");
            if (data.targetType.type !== Number) return;

            // this will generate a number value less than a BigInt
            // with up to 10 decimal places and randomly positive or
            // negative.

            // function randomInteger(min, max) {
            //     return Math.floor(Math.random() * (max - min + 1)) + min;
            // }

            // function randomNumber(min, max) {
            //     return Math.random() * (max - min) + min;
            // }


            // data.targetValue = Math.random() * (10 ** Math.floor(Math.random() * 10) + 1) * (Math.random() < 0.5 ? 1 : -1);

            data.targetValue = data.withWholeValue
                ? Math.floor(Math.random() * (data.maxValue - data.minValue + 1)) + data.minValue
                : Math.random() * (data.maxValue - data.minValue) + data.minValue;

            this.abort();
        });
    }
}
