import PipelineFilter from "../../../components/Pipeline/PipelineFilter";
import Utilities from "../../../Utilities";

export default class SetObjectFieldFilter extends PipelineFilter {
    constructor() {
        super((data) => {
            logger.log("SetObjectFieldFilter");

            if (data.fieldDef.type !== Object) return;

            const getter = { get: () => data.fieldVals[data.propName] };
            const setter = { set: (value) => Utilities.isObject(value) && value || data.setterTypeMismatch };

            Object.defineProperty(data.instance, data.propName, { ...getter, ...(!data.readonly && setter) });
        });
    }
};
