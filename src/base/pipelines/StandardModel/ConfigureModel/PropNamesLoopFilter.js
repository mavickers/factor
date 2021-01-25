import StandardModel from "../../../classes/StandardModel";
import PipelineFilter from "../../../components/Pipeline/PipelineFilter";
import PipelineArgs from "../../../components/Pipeline/PipelineArgs";
import ConfigureInstancePipeline from "../../StandardModel/ConfigureInstance";
import Globals from "../../../Globals";
import Utilities from "../../../Utilities";
import TypeMismatchSetOptions from "../../../classes/flags/TypeMismatchSetOptions";
import FieldDefinition from "../../../classes/FieldDefinition";

export default class PropNamesLoopFilter extends PipelineFilter {
    constructor() {
        super((data) => {
            data.propNames.forEach(propName => {
                const prop = data.configInstance[propName];

                if (!Utilities.isObject(prop)) return this.abort("invalid prop");
                console.log("model loop " + this.executionId);

                const propType = prop.hasOwnProperty("type") && Globals.FieldTypes.includes(prop.type) && prop.type || null;

                // if the type parameter was not valid there is no point in adding this
                // field to the config - throw a warning but continue, misconfigurations
                // can be handled by the consumer.
                if (propType == null) {
                    const abortMsg = `Model configuration: field '${propName}' in model '${data.model.name}' does not contain valid configuration`;
                    data.config.isMisconfigured = true;

                    console.warn(abortMsg);

                    return this.abort(abortMsg);
                }

                data.config.fieldDefs.push(new FieldDefinition({
                    name: propName,
                    type: propType,
                    required: prop.required,
                    readonly: prop.readonly,
                    default: prop.default,
                    // this can be set three ways: on the prop config, on
                    // the model config, or the default value in standard model.
                    onTypeMismatch:
                        prop.hasOwnProperty("onTypeMismatch") &&
                        prop.onTypeMismatch instanceof TypeMismatchSetOptions &&
                        prop.onTypeMismatch ||
                        data.config.onTypeMismatchDefault
                }));
            });
        });
    }
}
