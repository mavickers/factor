import PipelineFilter from "../../../components/Pipeline/PipelineFilter";
import Utilities from "../../../Utilities";
import TypeMismatchSetOptions from "../../../classes/flags/TypeMismatchSetOptions";
import Classes from "../../../Classes";

export default class InitializeFilter extends PipelineFilter {
    constructor() {
        super((data) => {
            const model = Utilities.getClass(data.instance)
            const parent = Utilities.getParentClass(data.instance);

            // abort the pipeline if it's already been configured or if it's
            // in the process of being initialized
            if (!(Utilities.isClass(model)) || (model.isConfigured && Object.isSealed(model.configuration))) return this.abort();
            if (model.configuration?.initialized) return this.abort();

            data.model = model;

            // we don't want to run this pipeline twice, only the first time it is instantiated
            model.configure({ initialized: true });

            // store classes into inheritance chain for reference
            Classes.addInheritance(model, parent);

            // if there is already a type mismatch handler attached to the model configuration,
            // favor that one for default; otherwise use the default value passed in through the
            // arguments; if that one is also invalid, throw an error.
            const onTypeMismatchDefault =
                data.model.configuration?.onTypeMismatchDefault instanceof TypeMismatchSetOptions &&
                data.model.configuration.onTypeMismatchDefault ||
                data.onTypeMismatchDefault instanceof TypeMismatchSetOptions &&
                data.onTypeMismatchDefault ||
                throw new Error("ConfigureModel Pipeline: onTypeMismatchDefault parameter invalid");

            data.methods = data.model._inherited.instanceMethods;
            data.propNames = Object.getOwnPropertyNames(data.instance).filter(prop => !data.methods.includes(prop));
            data.config = { fieldDefs: { }, isMisconfigured: false, onTypeMismatchDefault: onTypeMismatchDefault };
        });
    }
}
