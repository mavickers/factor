import PipelineFilter from "../../../components/Pipeline/PipelineFilter";

export default class LengthCheckFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            logger.log("LengthCheck Begin");

            if (!data) throw Error("LengthCheckFilter: data parameter is invalid");
            if (!data.parser.hasFixedArguments) return;

            data.fieldDefinitions.length !== data.args.length && data.errors.push("*") && this.abort();

            logger.log("LengthCheck End");
        });
    }
}
