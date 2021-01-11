import PipelineArgs from "./PipelineArgs";
import { Utilities } from "../../Utilities";

class PipelineFilter {
    constructor(input, next) {
        const filterName = Object.getPrototypeOf(this).constructor.name;
        const invalidNextArgsMsg = `Filter \"${filterName}\" received invalid 'next' argument`
        const invalidInputArgsMsg = `Filter \"${filterName}\" received invalid 'input' argument`;

        if (!Utilities.isFunction(next)) throw Error("PipelineFilter(): 'next' parameter invalid");
        if (!(input instanceof PipelineArgs)) PipelineArgs.create({ error: Error(invalidInputArgsMsg), meta: { input: input }});
    }
}

export default PipelineFilter
