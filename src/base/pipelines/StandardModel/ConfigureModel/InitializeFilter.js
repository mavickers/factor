import { PipelineFilter, Utilities } from "../../../../factor";

export default class InitializeFilter extends PipelineFilter {
    constructor() {
        super((data) => {
            if (!(Utilities.isFunction(data.model)) || data.model.isConfigured) return this.abort();

            data.instance = new data.model();
            data.propNames = Object.getOwnPropertyNames(instance);
            data.methods = model._inherited.instanceMethods;
            data.config = { fieldDefs: { }, isMisconfigured: false };
        });
    }
}


