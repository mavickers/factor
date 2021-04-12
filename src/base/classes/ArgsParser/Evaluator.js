import Utilities from "../../Utilities";
import Result from "./Result";

const { getClass, getType } = Utilities;

export default class {
    constructor(parser, args) {
        return function(profile) {
            const [ profileName, profileDefinition ] = profile;
            const fieldDefinitions = Object.entries(profileDefinition.definition);
            const errors = [ ];
            const values = { };
            let argsIndex = 0;

            // if the number of field definitions in the profile
            // do not match the number of arguments then disqualify
            // the profile; otherwise, process the field definitions.

            fieldDefinitions.length !== args.length && errors.push("*") ||
            fieldDefinitions.forEach(field => {
                const [ fieldName, fieldDefinition ] = field;
                const { type, required } = fieldDefinition;
                const argsSet = argsIndex < args.length && args.slice(argsIndex) || [ ];
                // getType does not do an ordered comparison; there may need
                // to be an adjustment so that objects are matched in order
                // of classes, functions, arrays, and then objects.
                const match = argsSet.find(arg => getType(arg) === type || getClass(arg) === type);

                // if we have a match reset argsIndex to the index of match and
                // push the match value onto the vals object; if we don't have a
                // match and the field is required push an error onto the errors object;
                // if we don't have a match and the field is not required null the
                // value on the field in the returned values; in all circumstances
                // proceed to the next field.

                match && (values[fieldName] = match) && (argsIndex = args.indexOf(match) + 1);
                !match && (required && errors.push(fieldName)) || (!required && (values[fieldName] = null));
            });

            // if we have errors then the profile doesn't match - set the errors
            // for the profile on the result object and return true to continue
            // processing entries; otherwise we have a match, so set the result
            // object and return false to stop processing the profile entries;

            return errors.length > 0 && (parser.result.errors[profileName] = errors) && true ||
                (parser.result.name = profileName) && (parser.result.definition = profileDefinition.definition) &&
                (parser.result.values = values) && (parser.result.profile = profileDefinition.profile) && false ||
                false;
        }
    }
}
