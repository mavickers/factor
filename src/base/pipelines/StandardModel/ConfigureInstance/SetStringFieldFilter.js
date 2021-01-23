import PipelineFilter from "../../../components/Pipeline/PipelineFilter";
import Utilities from "../../../Utilities";

export default class SetStringFieldFilter extends PipelineFilter {
    constructor() {
        super((data) => {
            if (data.fieldDef.type !== String) return;

            const getter = { get: () => data.fieldVals[data.propName] };
            const setter = { set: (value) => Utilities.isString(value) && value || data.setterTypeMismatch };

            Object.defineProperty(data.instance, data.propName, { ...getter, ...(!data.readonly && setter) });
        });
    }
};
