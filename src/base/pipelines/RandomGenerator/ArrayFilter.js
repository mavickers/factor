import { PipelineFilter } from "../../components/Pipeline";
import Globals from "../../Globals";

export default class ArrayFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            if (!data) return this.abort("data parameter is invalid");
            if (data.targetType.type !== Array) return;

            // generates a random-sized, two-dimensional array with
            // primitive types; size ranges from 1x1 to 5x5.

            const cols = Math.floor(Math.random() * 5) + 1
            const rows = Math.floor(Math.random() * 5) + 1
            const types = [ ...Array(cols) ].map(() => Math.floor(Math.random() * 5));
            const fns = [ data.generateBigInt, data.generateBoolean, data.generateNumber, data.generateString, data.generateSymbol ];
            const array = [];

            for(let r = 0; r < rows; r++) array.push(types.map(type => fns[type]()));

            data.targetValue = array;
        });
    }
}
