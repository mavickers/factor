import PipelineFilter from "../../../../components/Pipeline/PipelineFilter";

export default class SetBooleanFieldFilter extends PipelineFilter {
    constructor() {
        super(function(data) {
            if (data.fieldDef.type !== Boolean) return;

            Object.defineProperty(data.instance, data.propName, {
                get: function() { return data.fieldVals[data.propName]; },
                set: function(value) { data.fieldVals[data.propName] = (typeof value === "boolean" || value instanceof Boolean) && value; }
            });
        });
    }
};
