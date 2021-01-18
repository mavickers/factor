import PipelineFilter from "../../../../components/Pipeline/PipelineFilter";

export default class SetNumberFieldFilter extends PipelineFilter {
    constructor() {
        super(function(data) {
            if (data.fieldDef.type !== Number) return;

            Object.defineProperty(data.instance, data.propName, {
                get: function() { return data.fieldVals[data.propName]; },
                set: function(value) { data.fieldVals[data.propName] = (typeof value === "number" || value instanceof Number) && value || null; }
            });
        });
    }
};
