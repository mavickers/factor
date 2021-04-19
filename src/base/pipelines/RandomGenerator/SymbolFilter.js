import { PipelineFilter } from "../../components/Pipeline";

export default class SymbolFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            if (!data) return this.abort("data parameter is invalid");
            if (data.targetType.type !== Symbol) return;

            // this will randomly generate a symbol; 25% of the time
            // the symbol should be completely random (no seed string)
            // while the rest of the time it uses the random string
            // generator to use as a base.

            data.targetValue = data.generateSymbol();
        });
    }
}
