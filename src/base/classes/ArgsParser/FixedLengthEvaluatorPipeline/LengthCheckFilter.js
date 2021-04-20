import PipelineFilter from "../../../components/Pipeline/PipelineFilter";

export default class LengthCheckFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            if (!data) throw Error("LengthCheckFilter: data parameter is invalid");
            if (!data.withFixedLength) return;

            if (data.fieldDefinitions.length !== )
        });
    }
}
