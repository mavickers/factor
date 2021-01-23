import StandardModel from "../../../classes/StandardModel";
import PipelineFilter from "../../../components/Pipeline/PipelineFilter";
import PipelineArgs from "../../../components/Pipeline/PipelineArgs";
import ConfigureInstancePipeline from "../../StandardModel/ConfigureInstance";
import Globals from "../../../Globals";
import Utilities from "../../../Utilities";
import TypeMismatchSetOptions from "../../../classes/flags/TypeMismatchSetOptions";

export default class PropNamesLoopFilter extends PipelineFilter {
    constructor() {
        super((data) => {
            data.propNames.forEach(propName => {
                const prop = data.instance[propName];

                if (!Utilities.isObject(prop)) return this.abort();

                const propType = prop.hasOwnProperty("type") && Globals.FieldTypes.includes(prop.type) && prop.type || null;

                // if the type parameter was not valid there is no point in adding this
                // field to the config - throw a warning but continue, misconfigurations
                // can be handled by the consumer.
                if (propType == null) {
                    console.warn(`Model configuration: field '${propName}' in model '${data.model.name}' does not contain valid configuration`);
                    data.config.isMisconfigured = true;

                    return this.abort();
                }

                data.config.fieldDefs[propName] = {
                    type: propType,
                    required: prop.hasOwnProperty("required") && Utilities.isBoolean(prop.required) ? prop.required : false,
                    readonly: prop.hasOwnProperty("readonly") && Utilities.isBoolean(prop.readonly) ? prop.readonly : false,
                    default: prop.hasOwnProperty("default") && prop.default || null,
                    // this can be set three ways: on the prop config, on
                    // the model config, or the default value in standard model.
                    onTypeMismatch:
                        prop.hasOwnProperty("onTypeMismatch") &&
                        prop.onTypeMismatch instanceof TypeMismatchSetOptions &&
                        prop.onTypeMismatch ||
                        data.config.onTypeMismatchDefault
                };

                // propNames
                //     .filter(propName => !methods.includes(propName))
                //     .map(propName => new PipelineArgs({
                //         instance: instance,
                //         config: modelConfig,
                //         initialVals: initialVals,
                //         propName: propName,
                //         defaultSetOptions: defaultSetOptions
                //     }))
                //     .forEach(args => processFieldsPipeline.execute(args));

                // const configureInstanceArgs = new PipelineArgs({
                //     instance: data.instance,
                //     config: data.config,
                //     initialVals: data.initialVals,
                //     propName: propName
                // });
                //
                // ConfigureInstancePipeline.execute(configureInstanceArgs);
            });
        });
    }
}
