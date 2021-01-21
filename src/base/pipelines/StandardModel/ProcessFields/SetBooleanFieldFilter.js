import PipelineFilter from "../../../components/Pipeline/PipelineFilter";
import Utilities from "../../../Utilities";

export default class SetBooleanFieldFilter extends PipelineFilter {
    constructor() {
        super((data) => {
            if (data.fieldDef.type !== Boolean) return;

            const getter = { get: () => function() { return data.fieldVals[data.propName]; } };
            const setter = { set: (value) => data.fieldVals[data.propName] = Utilities.isBoolean(value) ? value : data.setterTypeMismatch }

            Object.defineProperty(data.instance, data.propName, { ...getter, ...(!data.readonly && setter) });
        });
    }
};
