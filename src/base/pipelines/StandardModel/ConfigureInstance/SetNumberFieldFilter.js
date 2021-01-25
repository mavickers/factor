import PipelineFilter from "../../../components/Pipeline/PipelineFilter";
import Utilities from "../../../Utilities";

export default class SetNumberFieldFilter extends PipelineFilter {
    constructor() {
        super((data) => {
            console.log("instance number");
            if (data.fieldDef.type !== Number) return;

            const getter = { get: () => data.fieldVals[data.propName] };
            const setter = { set: (value) => data.fieldVals[data.propName] = Utilities.isNumber(value) && value || data.setterTypeMismatch };

            Object.defineProperty(data.instance, data.propName, { ...getter, ...(!data.readonly && setter) });
        });
    }
};
