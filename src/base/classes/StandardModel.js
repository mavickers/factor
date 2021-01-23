import Classes from "../Classes";
import Configurable from "../interfaces/Configurable";
import Describable from "../interfaces/Describable";
import Mappable from "../interfaces/Mappable";
import PipelineArgs from "../components/Pipeline/PipelineArgs";
import Pipelines from "../pipelines";
import Utilities from "../Utilities";
import TypeMismatchSetOptions from "./flags/TypeMismatchSetOptions"

const configureModelPipeline = Pipelines.StandardModel.ConfigureModel;
const configureInstancePipeline = Pipelines.StandardModel.ConfigureInstance;
const typeMismatchSetOptionDefault = new TypeMismatchSetOptions("Ignore");

class StandardModel extends Classes([ Configurable, Describable, Mappable ]) {
    constructor(...args) {
        super();

        const initialVals = args.length > 0 && Utilities.isObject(args[0]) && args[0] || { };
        const configureModelPipelineArgs = new PipelineArgs({ instance: this, onTypeMismatchDefault: typeMismatchSetOptionDefault });

        configureModelPipeline.execute(configureModelPipelineArgs);


        // todo: restore the ConfigureInstance pipeline outside ConfigureModel
        // todo: move all this to the constructor and deprecate create()

        // todo: move this to configureInstance
        // Object.keys(initialVals).forEach(key => instance.hasOwnProperty(key) && (instance[key] = initialVals[key]));
    }
}

export default StandardModel;
