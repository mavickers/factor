import Classes from "../Classes";
import Configurable from "../interfaces/Configurable";
import Describable from "../interfaces/Describable";
import Mappable from "../interfaces/Mappable";
import PipelineArgs from "../components/Pipeline/PipelineArgs";
import Pipelines from "../pipelines";
import Utilities from "../Utilities";
import TypeMismatchSetOptions from "./flags/TypeMismatchSetOptions"


const configureModelPipeline = Pipelines.StandardModel.ConfigureModel;
const processFieldsPipeline = Pipelines.StandardModel.ProcessFields;
const typeMismatchSetOptionDefault = new TypeMismatchSetOptions("Ignore");

class StandardModel extends Classes([ Configurable, Describable, Mappable ]) {
    constructor() {
        super();

        const modelChild = Utilities.getClass(this)
        const modelParent = Utilities.getParentClass(this);

        Classes.addInheritance(modelChild, modelParent);
    }

    static create(...args) {
        const initialVals = args.length > 0 && Utilities.isObject(args[0]) && args[0] || { };
        const pipelineArgs = new PipelineArgs({
            model: this,
            onTypeMismatchDefault:
                (this.configuration?.onTypeMismatchDefault ?? null) instanceof TypeMismatchSetOptions &&
                this.configuration.onTypeMismatchDefault ||
                typeMismatchSetOptionDefault,
            initialVals: initialVals
        });

        this.configure(() => configureModelPipeline.execute(pipelineArgs));

        const instance = new this();
        // const methods = this._inherited.instanceMethods;
        // const propNames = Object.getOwnPropertyNames(instance);
        // const modelConfig = this.configuration;
        // //const initialVals = Utilities.isObject(args) && args || { };
        //
        // // iterate through the fields, replace with getter/setters, set default values
        // propNames
        //     .filter(propName => !methods.includes(propName))
        //     .map(propName => new PipelineArgs({ instance: instance, config: modelConfig, initialVals: initialVals, propName: propName, defaultSetOptions: defaultSetOptions }))
        //     .forEach(args => processFieldsPipeline.execute(args));

        // iterate through the arguments and set the values accordingly
        Object.keys(initialVals).forEach(key => instance.hasOwnProperty(key) && (instance[key] = initialVals[key]));

        //const instance = new this();

        return Object.seal(new this());
    }
}

export default StandardModel;
