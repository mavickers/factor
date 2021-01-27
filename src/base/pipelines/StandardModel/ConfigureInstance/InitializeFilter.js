import PipelineFilter from "../../../components/Pipeline/PipelineFilter";
import TypeMismatchSetOptions from "../../../classes/flags/TypeMismatchSetOptions";
import Utilities from "../../../Utilities";
import StandardModel from "../../../classes/StandardModel";

export default class InitializeFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            logger.log("InitializeFilter");

            if (!data) return this.abort("data parameter is invalid");

            const { findFrom } = Utilities;

            data.newInstance = data.newInstance || findFrom(data.arguments).firstInstanceOf(StandardModel);
            data.model = data.model || Utilities.getClass(data.newInstance) || findFrom(data.arguments).firstInheritanceOf(StandardModel);

            if (!data.newInstance) return this.abort("could not find StandardModel instance in arguments");
            if (data.model.configuration?.initializing) return this.abort("model is initializing");

            // todo: parse out initialVals from args; the below was stripped from the StandardModel constructor
            // const initialVals = args.length > 0 && Utilities.isObject(args[0]) && args[0] || { };

            data.parent = data.newInstance && Utilities.getParentClass(data.newInstance);
            data.config = data.model.configuration;
            data.fieldVals = { };

            if (data.model?.configuration?.initializing) return this.abort();
        });
    }
}
