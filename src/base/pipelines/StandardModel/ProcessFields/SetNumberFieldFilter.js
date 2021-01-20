import PipelineFilter from "../../../components/Pipeline/PipelineFilter";
import Utilities from "../../../Utilities";

export default class SetNumberFieldFilter extends PipelineFilter {
    constructor() {
        super((data) => {
            if (data.fieldDef.type !== Number) return;

            // todo: refactor setting to take setOptions into account (if you can)
            Object.defineProperty(data.instance, data.propName, {
                get: function() { return data.fieldVals[data.propName]; },
                set: undefined
                // ...(!data.readonly && {
                //     set: function(value) { data.fieldVals[data.propName] = Utilities.isNumber(value) && value || null; }
                //})
            });
        });
    }
};
