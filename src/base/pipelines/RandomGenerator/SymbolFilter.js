import { PipelineFilter } from "../../components/Pipeline";
import Utilities from "../../Utilities";

export default class SymbolFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            if (!data) throw Error("SymbolFilter: data parameter is invalid");
            if (data.targetType.type !== Symbol) return;

            // this will randomly generate a symbol; 25% of the time
            // the symbol should be completely random (no seed string)
            // while the rest of the time it uses the random string
            // generator to use as a base.

            data.targetValue = Math.random () < .25 ? Symbol() : Symbol(Utilities.getRandom(String));

            this.abort();
        });
    }
}
