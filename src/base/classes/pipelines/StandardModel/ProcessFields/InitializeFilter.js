import { PipelineFilter } from "../../../../components/Pipeline";

export default class InitializeFilter extends PipelineFilter {
    constructor() {
        super(function(data) {
            const { instance, config, initialVals, propName } = data;

            delete instance[propName];

            if (!config?.fieldDefs?.[propName] ?? false) return this.abort();

            data.fieldDef = config?.fieldDefs?.[propName] ?? null;
            data.fieldValDefault = fieldDef.default || (fieldDef.type == Boolean ? false : null);
            data.readOnly = (fieldDef?.readOnly ?? false) || false;
            data.fieldVals = { };
        });
    }
}
