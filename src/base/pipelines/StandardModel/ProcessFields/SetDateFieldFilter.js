import PipelineFilter from "../../../components/Pipeline/PipelineFilter";
import Utilities from "../../../Utilities";

export default class SetDateFieldFilter extends PipelineFilter {
    constructor() {
        super((data) => {
            if (data.fieldDef.type !== Date) return;

            Object.defineProperty(data.instance, data.propName, {
                get: function() { return data.fieldVals[data.propName]; },
                ...(!data.readonly && { set: function(value) { data.fieldVals[data.propName] = Utilities.isDate(value) && value || data.instance[data.propName]; }})
            });
        });
    }
}
