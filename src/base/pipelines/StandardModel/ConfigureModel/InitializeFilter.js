import PipelineFilter from "../../../components/Pipeline/PipelineFilter";
import Utilities from "../../../Utilities";

export default class InitializeFilter extends PipelineFilter {
    constructor() {
        super((data) => {
            if (!(Utilities.isClass(data.model)) || (data.model.isConfigured && Object.isSealed(data.model.configuration))) return this.abort();

            data.instance = new data.model();
            data.propNames = Object.getOwnPropertyNames(data.instance);
            data.methods = data.model._inherited.instanceMethods;
            data.config = { fieldDefs: { }, isMisconfigured: false, onTypeMismatchDefault: data.onTypeMismatchDefault };
        });
    }
}
