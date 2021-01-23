import PipelineFilter from "../../../components/Pipeline/PipelineFilter";
import TypeMismatchSetOptions from "../../../classes/flags/TypeMismatchSetOptions";
import Utilities from "../../../Utilities";

export default class InitializeFilter extends PipelineFilter {
    constructor() {
        super((data) => {
            delete data.instance[data.propName];

            data.model = Utilities.getClass(data.instance);

            if (!data.model.configuration?.fieldDefs.length ?? 0 === data.propNames.length)
                throw Error("ConfigureInstance Pipeline: missing model configuration");

            // todo: this stuff will need to move into each of the filters - search through
            //       configuration.fieldDefs for matching types and process accordingly

            data.fieldDef = data.config?.fieldDefs?.[data.propName] ?? null;
            data.fieldValDefault = data.fieldDef.default || (data.fieldDef.type === Boolean ? false : null);
            data.readOnly = (data.fieldDef?.readOnly ?? false) || false;
            data.fieldVals = { };

            Object.defineProperty(data, "typeMismatchHandler", { get: () => {
                const setOptions = data.fieldDef.onTypeMismatch || new TypeMismatchSetOptions();

                // todo: implement ignore (how?)
                if (setOptions.equals("NoopOnTypeMismatch")) return data.fieldVals[data.propName];
                if (setOptions.equals("NullOnTypeMismatch")) return null;
                if (setOptions.equals("ErrorOnTypeMismatch")) throw new Error(`Field Setting Filter for '${data.propName}': type mismatch`);

                throw new Error("setterTypeMismatchFn(): setOptions for type mismatch could not be determined");
            }});
        });
    }
}
