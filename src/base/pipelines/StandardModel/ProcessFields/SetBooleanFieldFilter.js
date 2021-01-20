import PipelineFilter from "../../../components/Pipeline/PipelineFilter";
import Utilities from "../../../Utilities";

export default class SetBooleanFieldFilter extends PipelineFilter {
    constructor() {
        super((data) => {
            if (data.fieldDef.type !== Boolean) return;

            Object.defineProperty(data.instance, data.propName, {
                get: function() { return data.fieldVals[data.propName]; },
                ...(!data.readonly && { set: function(value) { data.fieldVals[data.propName] = Utilities.isBoolean(value) ? value : data.instance[data.propName]; }})
            });
        });
    }
};
