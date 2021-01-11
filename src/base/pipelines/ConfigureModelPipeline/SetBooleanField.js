import PipelineFilter from "../../components/Pipeline/PipelineFilter";

class SetBooleanField extends PipelineFilter {
    constructor(input, next) {
        super(input, next);

        if (input.error) return next(input);

        const instance = input.instance;
        const config = input.config;
        const propName = input.propName;

        if (config.fieldDefs[propName].type === Boolean) {
            Object.defineProperty(instance, propName, {
                get: function() { return field; },
                set: function(value) { field = typeof value === "boolean" && value; }
            });
        }

    }
}
