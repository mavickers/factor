import PipelineFilter from "../../../components/Pipeline/PipelineFilter";
import { isNotNil } from "../../../Utilities/nil";

export default class WrapupFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            logger.log("WrapupFilter Begin");
            // process pipeline error if one thrown

            if (isNotNil(this.error)) {
                logger.log(`Pipeline threw an error`);
                logger.log(this.error.message);
                logger.flush(data.withLogging);
                return;

            }
            // the parser has already run and found a good profile,
            // skip result processing.

            if (isNotNil(data.parser.result.profileName)) return logger.log(`Parsing '${data.profileName}' skipped`).flush(data.withLogging);

            data.errors.length > 0
                ? data.parser.result.errors[data.profileName] = data.errors
                : (data.parser.result.profileName = data.profileName) &&
                  (data.parser.result.values = data.values) &&
                  (data.parser.result.profileDefinition = data.profileDefinition.profile);

            logger.log(`Parsing '${data.profileName}' ${data.errors.length > 0 ? "found errors" : "was successful"}`);
            logger.log("WrapupFilter End");
            logger.flush(data.withLogging);
        });
    }
}
