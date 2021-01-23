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
        // const configureModelPipelineArgs = new PipelineArgs({ instance: this, onTypeMismatchDefault: typeMismatchSetOptionDefault });
        const configureModelPipelineArgs = new PipelineArgs(this, typeMismatchSetOptionDefault);

        configureModelPipeline.execute(configureModelPipelineArgs);

        // todo: propNames should not be dependent on the previous pipeline as that pipeline
        //       only runs on the first instantiation; make sure propNames are available in
        //       configuration
        const configureInstancePipelineArgs = new PipelineArgs({ instance: this, initialVals: initialVals, propNames: configureModelPipelineArgs.propNames });

//        configureInstancePipeline.execute(configureInstancePipelineArgs);




        // todo: restore the ConfigureInstance pipeline outside ConfigureModel

        // todo: move this to configureInstance
        // Object.keys(initialVals).forEach(key => instance.hasOwnProperty(key) && (instance[key] = initialVals[key]));
    }
}

export default StandardModel;
