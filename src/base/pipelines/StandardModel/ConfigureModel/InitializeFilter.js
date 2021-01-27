import PipelineFilter from "../../../components/Pipeline/PipelineFilter";
import Utilities from "../../../Utilities";
import TypeMismatchSetOptions from "../../../classes/flags/TypeMismatchSetOptions";
import Classes from "../../../Classes";
import StandardModel from "../../../classes/StandardModel";

export default class InitializeFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            logger.group("ConfigureModel").log("InitializeFilter");

            if (!data) return this.abort("data parameter is invalid");

            const { findFrom } = Utilities;

            data.newInstance = data.newInstance || findFrom(data.arguments).firstInstanceOf(StandardModel);
            data.parent = data.newInstance && Utilities.getParentClass(data.newInstance);
            data.model = data.model || Utilities.getClass(data.newInstance) || findFrom(data.arguments).firstInheritanceOf(StandardModel);

            const modelIsInitializing = data?.model?.configuration?.initializing ?? false;

            if (!data.newInstance) return this.abort("could not find StandardModel instance in arguments");

            logger.log(
                "checking initializing",
                `Utilities.isClass(data.model): ${Utilities.isClass(data.model)}`,
                `data.model.isConfigured: ${data.model.isConfigured}`,
                `Object.isSealed(data.model.configuration): ${Object.isSealed(data.model.configuration)}`
            );

            // abort the pipeline if it's initializing or if it's in the
            // process of being initialized
            if (!(Utilities.isClass(data.model)) || (data.model.isConfigured && Object.isSealed(data.model.configuration))) return this.abort();

            logger.log(`model is initializing (a): ${modelIsInitializing}`);

            if (modelIsInitializing) return this.abort("model is initializing");

            logger.log("initializing");

            // we don't want to run this pipeline twice, only the first time it is instantiated
            data.model.configure({ initializing: true });
            logger.log(`model is initializing (b): ${data?.model?.configuration?.initializing ?? false}`);

            // store classes into inheritance chain for reference
            Classes.addInheritance(data.model, data.parent);

            data.methods = data.model._inherited.instanceMethods;
            // we are creating another instance of the model here to fetch the
            // property names - we are still inside the constructor here so the
            // property names of the instance passed into the pipeline are not
            // available yet.
            data.configInstance = new data.model();
            data.propNames = Object.getOwnPropertyNames(data.configInstance).filter(prop => !data.methods.includes(prop));

            // if there is already a type mismatch handler attached to the model configuration,
            // favor that one for default; otherwise use the default value passed in through the
            // arguments; if that one is also invalid, throw an error.

            const onTypeMismatchDefault =
                data.model.configuration?.onTypeMismatchDefault instanceof TypeMismatchSetOptions &&
                data.model.configuration.onTypeMismatchDefault ||
                data.onTypeMismatchDefault instanceof TypeMismatchSetOptions &&
                data.onTypeMismatchDefault ||
                throw new Error("ConfigureModel Pipeline: onTypeMismatchDefault parameter invalid");

            data.config = { fieldDefs: [ ], isMisconfigured: false, onTypeMismatchDefault: onTypeMismatchDefault, propNames: data.propNames };

            logger.log("exit");
        });
    }
}
