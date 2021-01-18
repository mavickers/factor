import PipelineFilter from "../../../../components/Pipeline/PipelineFilter";
import Utilities from "../../../../Utilities";

export default class SetObjectFieldFilter extends PipelineFilter {
    constructor() {
        super(function(data) {
            if (data.fieldDef.type !== Object) return;

            Object.defineProperty(data.instance, data.propName, {
                get: function() { return data.fieldVals[data.propName]; },
                ...(!data.readOnly && { set: function(value) { data.fieldVals[data.propName] = Utilities.isObject(value) && value || null; }})
            });
        });
    }
};
