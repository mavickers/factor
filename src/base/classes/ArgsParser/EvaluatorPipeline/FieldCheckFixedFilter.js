import PipelineFilter from "../../../components/Pipeline/PipelineFilter"
import { getType } from "../../../Utilities/types";
import { getClass } from "../../../Utilities/classes";
import { isNil, isNotNil } from "../../../Utilities/nil";
import { isBoolean } from "../../../Utilities/booleans";

export default class FieldCheckFixedFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            logger.log("FieldCheckFixed Begin");

            if (!data && data.parser) throw Error("FieldCheckFilter: invalid data parameter");
            if (!data.parser.hasFixedArguments) return;
            if (data.fieldDefinitionsIndex >= data.fieldDefinitions.length) return;

            const field = data.fieldDefinitions[data.fieldDefinitionsIndex];
            const [ fieldName, fieldDefinition ] = field;
            const { type, required } = fieldDefinition;
            const arg = data.args[data.fieldDefinitionsIndex];

            // todo: getType does not do an ordered comparison; there may need
            //       to be an adjustment so that objects are matched in order
            //       of classes, functions, arrays, and then objects.

            // if we have a nil arg value push the fieldName onto the errors array if the field
            // was required; otherwise assign the field value to null.

            if (isNil(arg)) required ? data.errors.push(fieldName) : data.values[fieldName] = null;
            // if we have a value and it matches the type in the field definition assign the field value
            // to the argument value; otherwise push the fieldName onto the errors array.

            if (isNotNil(arg)) getType(arg) === type || getClass(arg) === type ? data.values[fieldName] = arg : data.errors.push(fieldName);

            // increment the index and repeat this filter
            data.fieldDefinitionsIndex++;
            this.repeat();

            logger.log("FieldCheckFixed End");
        });
    }
}
