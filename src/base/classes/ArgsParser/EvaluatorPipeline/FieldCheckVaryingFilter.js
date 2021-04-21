import PipelineFilter from "../../../components/Pipeline/PipelineFilter"
import { getType, isType } from "../../../Utilities/types";
import { getClass } from "../../../Utilities/classes";
import { isNil, isNotNil } from "../../../Utilities/nil";

export default class FieldCheckVaryingFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            logger.log("FieldCheckVarying Begin");

            if (!data && data.parser) throw Error("FieldCheckFilter: invalid data parameter");
            if (!data.parser.hasVaryingArguments) return;
            if (data.fieldDefinitionsIndex >= data.fieldDefinitions.length) return;

            const field = data.fieldDefinitions[data.fieldDefinitionsIndex];
            const [ fieldName, fieldDefinition ] = field;
            const { type, required } = fieldDefinition;
            const arg = data.args.find(a => !a.isUsed && isType(a.value, type)) ?? { value: undefined, used: false };

            // if we have a nil arg value push the fieldName onto the errors array if the field
            // was required; otherwise assign the field value to null.
            if (isNil(arg.value)) required ? data.errors.push(fieldName) : data.values[fieldName] = null;

            // if we have a value and it matches the type in the field definition assign the field value
            // to the argument value; otherwise push the fieldName onto the errors array.
            if (isNotNil(arg.value)) getType(arg) === type || getClass(arg) === type
                ? data.values[fieldName] = arg.value && (arg.isUsed = true)
                : data.errors.push(fieldName);

            // increment the index and repeat this filter
            data.fieldDefinitionsIndex++;
            this.repeat();

            logger.log("FieldCheckVarying End");
        });
    }
}
