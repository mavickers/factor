import PipelineFilter from "../../../components/Pipeline/PipelineFilter";

export default class LengthCheckFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            if (!data) throw Error("LengthCheckFilter: data parameter is invalid");
            if (data.parser.hasVaryingArguments) return;

            data.fieldDefinitions.length !== data.args.length && data.errors.push("*") && this.abort();
        });
    }
}
