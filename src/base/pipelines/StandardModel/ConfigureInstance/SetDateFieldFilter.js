import PipelineFilter from "../../../components/Pipeline/PipelineFilter";
import Utilities from "../../../Utilities";

export default class SetDateFieldFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            logger.log("SetDateFieldFilter");

            if (data.fieldDefs.type !== Date) return;

            const getter = { get: () => data.fieldVals[data.propName] };
            const setter = { set: (value) => data.fieldVals[data.propName] = Utilities.isDate(value) && value || data.setterTypeMismatch };

            Object.defineProperty(data.instance, data.propName, { ...getter, ...(!data.readonly && setter) });
        });
    }
}
