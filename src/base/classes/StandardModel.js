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
const defaultSetOptions = { setOptions: new SetOptions(SetOptions.NoopOnTypeMismatch) };

class StandardModel extends Classes([ Configurable, Describable, Mappable ]) {
    constructor() {
        // todo: figure out how to disable the constructor and force
        //       usage of create(); the SO article below is a bit convoluted
        //       but a Proxy or class wrapper may be the answer.
        //       https://stackoverflow.com/questions/21667149/how-to-define-private-constructors-in-javascript

        // todo: also consider migrating create() to eventual
        //       repo-enabled class

        super();

        const modelChild = Utilities.getChildClass(this)
        const modelParent = Utilities.getParentClass(this);

        Classes.addInheritance(modelChild, modelParent);
    }

    static create(...args) {
        const pipelineArgs = new PipelineArgs({ model: this, options: defaultSetOptions });

        this.configure(() => configureModelPipeline.execute(pipelineArgs));

        const instance = new this();
        const methods = this._inherited.instanceMethods;
        const propNames = Object.getOwnPropertyNames(instance);
        const config = this._config;
        const initialVals = Utilities.isObject(args) && args || { };

        // iterate through the fields, replace with getter/setters, set default values
        propNames
            .filter(propName => !methods.includes(propName))
            .map(propName => new PipelineArgs({ instance: instance, config: config, initialVals: initialVals, propName: propName }))
            .forEach(args => processFieldsPipeline.execute(args));

        // iterate through the arguments and set the values accordingly
        initialVals.forEach(key => instance.hasOwnProperty(key) && (instance[key] = initialVals[key]));

        return Object.seal(instance);
    }
}

const fieldTypes = [ Boolean, Number, String, StandardModel, Object, Error ];

export default StandardModel;
