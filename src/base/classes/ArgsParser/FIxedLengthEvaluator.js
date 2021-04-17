/*  FixedLengthEvaluator.js
 *
 *  evaluator class for args parser; evaluates a given profile
 *  against a given set of args; the number of fields defined
 *  in the profile must match the number of args or the profile
 *  is disqualified; a profile disqualified due to a mismatched
 *  number of arguments is marked as error on all fields ("*")
 *  in the error array.
 */

import Utilities from "../../Utilities";

const { getClass, getType } = Utilities;

export default class {
    constructor(parser, args) {
        return function(profile) {
            const [ profileName, profileDefinition ] = profile;
            const fieldDefinitions = Object.entries(profileDefinition.definition);
            const errors = [ ];
            const values = { };

            // if the number of field definitions in the profile
            // do not match the number of arguments then disqualify
            // the profile; otherwise, process the field definitions.

            fieldDefinitions.length !== args.length && errors.push("*") ||
            fieldDefinitions.forEach(field => {
                const [ fieldName, fieldDefinition ] = field;
                const { type, required } = fieldDefinition;
                const index = fieldDefinitions.indexOf(field);
                const arg = args[index];
                const argIsNil = arg === null || arg === undefined;

                // todo: getType does not do an ordered comparison; there may need
                //       to be an adjustment so that objects are matched in order
                //       of classes, functions, arrays, and then objects.

                // a match is if the field is not required and the arg value is null
                // or the arg is not null and matches the defined type or class.

                const match = argIsNil && !required ? null : (!argIsNil && getType(arg) === type || getClass(arg) === type) && arg;

                // if we have a match reset argsIndex to the index of match and
                // push the match value onto the vals object; if we don't have a
                // match and the field is required push an error onto the errors object;
                // if we don't have a match and the field is not required null the
                // value on the field in the returned values; in all circumstances
                // proceed to the next field.

                // if we have a match push the match value onto the vals object;

                match && (values[fieldName] = match) || errors.push(fieldName);
                // !match && (required && errors.push(fieldName)) || (!required && (values[fieldName] = null));
            });

            // if we have errors then the profile doesn't match - set the errors
            // for the profile on the result object and return true to continue
            // processing entries; otherwise we have a match, so set the result
            // object and return false to stop processing the profile entries;

            return errors.length > 0 && (parser.result.errors[profileName] = errors) && true ||
                (parser.result.profileName = profileName) && (parser.result.values = values) &&
                (parser.result.profileDefinition = profileDefinition.profile) && false || false;
        }
    }
}
