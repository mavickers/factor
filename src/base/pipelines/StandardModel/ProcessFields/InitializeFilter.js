import PipelineFilter from "../../../components/Pipeline/PipelineFilter";

export default class InitializeFilter extends PipelineFilter {
    constructor() {
        super((data) => {
            delete data.instance[data.propName];

            if (!data.config?.fieldDefs?.[data.propName] ?? false) return this.abort();

            data.fieldDef = data.config?.fieldDefs?.[data.propName] ?? null;
            data.fieldValDefault = data.fieldDef.default || (data.fieldDef.type === Boolean ? false : null);
            data.readOnly = (data.fieldDef?.readOnly ?? false) || false;
            data.fieldVals = { };

            Object.defineProperty(data, "setterTypeMismatch", { get: () => {
                const setOptions = data.config.setOptions;

                if (setOptions.equals("NoopOnTypeMismatch")) return data.fieldVals[data.propName];
                if (setOptions.equals("NullOnTypeMismatch")) return null;
                if (setOptions.equals("ErrorOnTypeMismatch")) throw new Error(`Field Setting Filter for '${data.propName}': type mismatch`);

                throw new Error("setterTypeMismatchFn(): setOptions for type mismatch could not be determined");
            }});
        });
    }
}
