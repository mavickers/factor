import { PipelineArgs, Utilities } from "../../../factor";

class PipelineFilter {
    constructor(input, next) {
        const filterName = Object.getPrototypeOf(this).constructor.name;
        const invalidNextArgsMsg = `Filter \"${filterName}\" received invalid 'next' argument`
        const invalidInputArgsMsg = `Filter \"${filterName}\" received invalid 'input' argument`;

        if (!Utilities.isFunction(next)) throw Error("PipelineFilter(): 'next' parameter invalid");
        if (!(input instanceof PipelineArgs)) PipelineArgs.new({ error: Error(invalidInputArgsMsg), meta: { input: input }});
    }
}
