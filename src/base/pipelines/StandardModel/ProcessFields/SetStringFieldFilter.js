import PipelineFilter from "../../../components/Pipeline/PipelineFilter";
import Utilities from "../../../Utilities";

export default class SetStringFieldFilter extends PipelineFilter {
    constructor() {
        super((data) => {
            if (data.fieldDef.type !== String) return;

            Object.defineProperty(data.instance, data.propName, {
                get: function() { return data.fieldVals[data.propName]; },
                ...(!data.readOnly && { set: function(value) { data.fieldVals[data.propName] = Utilities.isString(value) && value.trim() || null; }})
            });
        });
    }
};
