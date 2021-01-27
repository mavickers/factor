import { Classes, Globals, Configurable, Describable, Mappable, Logger, PipelineArgs } from "../../factor";
import Pipelines from "../pipelines";
import TypeMismatchSetOptions from "./flags/TypeMismatchSetOptions"

const configureModelPipeline = Pipelines.StandardModel.ConfigureModel;
const configureInstancePipeline = Pipelines.StandardModel.ConfigureInstance;
const typeMismatchSetOptionDefault = new TypeMismatchSetOptions("Ignore");

class StandardModel extends Classes([ Configurable, Describable, Mappable ]) {
    constructor(...args) {
        super();

        const logger = new Logger();

        logger.log("constructor");

        const configureModelPipelineArgs = new PipelineArgs(this, typeMismatchSetOptionDefault, logger);
        const configureInstancePipelineArgs = new PipelineArgs(this, args, logger);

        configureModelPipeline.execute(configureModelPipelineArgs);
        configureInstancePipeline.execute(configureInstancePipelineArgs);

        logger.flush();

        // todo: move this to configureInstance
        // Object.keys(initialVals).forEach(key => instance.hasOwnProperty(key) && (instance[key] = initialVals[key]));
    }
}

export default StandardModel;
