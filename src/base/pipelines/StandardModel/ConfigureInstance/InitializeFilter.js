import PipelineFilter from "../../../components/Pipeline/PipelineFilter";
import TypeMismatchSetOptions from "../../../classes/flags/TypeMismatchSetOptions";
import Utilities from "../../../Utilities";
import StandardModel from "../../../classes/StandardModel";

export default class InitializeFilter extends PipelineFilter {
    constructor() {
        super((data) => {
            if (!data) return this.abort("data parameter is invalid");

            const { findFrom } = Utilities;

            data.newInstance = data.newInstance || findFrom(data.arguments).firstInstanceOf(StandardModel);
            data.model = data.model || Utilities.getClass(data.newInstance) || findFrom(data.arguments).firstInheritanceOf(StandardModel);

            if (!data.newInstance) return this.abort("could not find StandardModel instance in arguments");
            if (data.model.configuration?.initializing) return this.abort("model is initializing");


            data.parent = data.newInstance && Utilities.getParentClass(data.newInstance);
            data.config = data.model.configuration;
            data.fieldVals = { };
            data.setter = {
                forBoolean: (name) => { return {
                    withValue: (value) => {
                        if (!(name && data.config.fieldDefs[name])) throw new Error("invalid field name in setter");


                        return;
                    }
                }}
            };

            // console.log(data.config);

            if (data.model?.configuration?.initializing) return this.abort();

            Object.defineProperty(data, "typeMismatchHandler", { get: () => {
                const setOptions = data.config.fieldDefs.onTypeMismatch || new TypeMismatchSetOptions();

                // todo: implement ignore (how?)
                if (setOptions.equals("NoopOnTypeMismatch")) return data.fieldVals[data.propName];
                if (setOptions.equals("NullOnTypeMismatch")) return null;
                if (setOptions.equals("ErrorOnTypeMismatch")) throw new Error(`Field Setting Filter for '${data.propName}': type mismatch`);

                throw new Error("setterTypeMismatchFn(): setOptions for type mismatch could not be determined");
            }});
        });
    }
}
