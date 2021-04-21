import PipelineFilter from "../../../components/Pipeline/PipelineFilter"
import { copyAndSeal, merge } from "../../../Utilities/objects";

export default class InitializeFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            logger.group("Evaluator Pipeline").log;
            logger.log("Initialize Begin");

            if (!(data && Array.isArray(data) && data.length === 1)) throw Error("InitializeFilter: data parameter is invalid");
            if (!(data[0].parser && data[0].argsArray && data[0].profile)) throw Error("InitializeFilter: data parameter is invalid");
            const newData = {
                parser: data[0].parser,
                profile: data[0].profile,
                args: data[0].argsArray,
                withLogging: data[0].withLogging || false
            };

            newData.profileName = newData.profile[0];

            newData.profileDefinition = newData.profile[1];
            newData.fieldDefinitions = Object.entries(newData.profileDefinition.definition);
            newData.errors = [ ];
            newData.values = { };
            newData.fieldDefinitionsIndex = 0;

            logger.log("Initialize End");

            return newData;
        });
    }
}
