import PipelineFilter from "../../../components/Pipeline/PipelineFilter"

export default class InitializeFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            if (!(data && data.profile)) throw Error("InitializeFilter: data parameter is invalid");

            const newData = {
                profile: data.profile,
                withFixedLength: data.withFixedLength && data.withFixedLength !== false || true
            };

            newData.profileName = newData.profile[0];
            newData.profileDefinition = newData.profile[1];
            newData.fieldDefinitions = Object.entries(newData.profileDefinition.definition);
            newData.errors = [ ];
            newData.values = { };

            return newData;
        });
    }
}
