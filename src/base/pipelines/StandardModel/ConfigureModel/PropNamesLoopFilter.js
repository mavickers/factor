import PipelineFilter from "../../../components/Pipeline/PipelineFilter";
import StandardModel from "../../../classes/StandardModel";

const fieldTypes = [ Boolean, Number, String, StandardModel, Object, Error ];

export default class PropNamesLoopFilter extends PipelineFilter {
    constructor() {
        super((data) => {
            data.propNames.filter(prop => !data.methods.includes(prop)).forEach(propName => {
                const propConfig = { type: null, required: false, default: null, value: null };
                const prop = data.instance[propName];

                if (!(typeof prop == "object" || prop instanceof Object)) return this.abort();
                if (prop.hasOwnProperty("type") && (fieldTypes.includes(prop["type"]) || fieldTypes.includes(Object.getPrototypeOf(prop["type"])))) propConfig["type"] = prop["type"];

                // if the type parameter was not valid there is not point in adding this
                // field to the config - throw a warning but continue, misconfigurations
                // can be handled by the consumer.
                if (propConfig["type"] == null) {
                    console.warn(`Model configuration: field '${propName}' in model '${data.model.name}' does not contain valid configuration`);
                    data.config.isMisconfigured = true;

                    return this.abort();
                }

                data.config.fieldDefs[propName] = prop;
            });
        });
    }
}
