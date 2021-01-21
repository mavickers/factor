import Classes from "../Classes";
import Configurable from "../interfaces/Configurable";
import Describable from "../interfaces/Describable";
import Mappable from "../interfaces/Mappable";
import PipelineArgs from "../components/Pipeline/PipelineArgs";
import Pipelines from "../pipelines";
import Utilities from "../Utilities";
import SetOptions from "./flags/StandardModelSetOptions"


const configureModelPipeline = Pipelines.StandardModel.ConfigureModel;
const processFieldsPipeline = Pipelines.StandardModel.ProcessFields;
const defaultSetOptions = new SetOptions().set(SetOptions.NoopOnTypeMismatch);

class StandardModel extends Classes([ Configurable, Describable, Mappable ]) {
    constructor() {
        super();

        const modelChild = Utilities.getChildClass(this)
        const modelParent = Utilities.getParentClass(this);

        Classes.addInheritance(modelChild, modelParent);
    }

    static create(...args) {
        const pipelineArgs = new PipelineArgs({ model: this });

        this.configure(() => configureModelPipeline.execute(pipelineArgs));

        const instance = new this();
        const methods = this._inherited.instanceMethods;
        const propNames = Object.getOwnPropertyNames(instance);
        const modelConfig = this.configuration;
        const initialVals = Utilities.isObject(args) && args || { };

        // iterate through the fields, replace with getter/setters, set default values
        propNames
            .filter(propName => !methods.includes(propName))
            .map(propName => new PipelineArgs({ instance: instance, config: modelConfig, initialVals: initialVals, propName: propName, defaultSetOptions: defaultSetOptions }))
            .forEach(args => processFieldsPipeline.execute(args));

        // iterate through the arguments and set the values accordingly
        initialVals.forEach(key => instance.hasOwnProperty(key) && (instance[key] = initialVals[key]));

        return Object.seal(instance);
    }
}

const fieldTypes = [ Boolean, Number, String, StandardModel, Object, Error ];

export default StandardModel;
