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
        });
    }
}
