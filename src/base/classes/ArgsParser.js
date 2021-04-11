import Flags from "./Flags";
import Utilities from "../Utilities";
import Globals from "../Globals";

const primitives = [ "BigInt", "Boolean", "Number", "String", "Symbol" ];
const { getClass, getType, isArguments, newUuidShort } = Utilities;

class Result {
    errors = { };     // errors for each profile... { profile1: [ field1, field2, ..., fieldN ] }
    name = undefined; // the matching profile name... "{{ name }}"
    definition = { }; // the matching profile definition... { field1: { type: type, required: true/false }, ..., fieldN: { type: type, required: true/false } }
    values = { };     // field values for the matching profile... { field1: val1, ... fieldN: valN }
}

export default class {
    #classes;
    #args;
    #profiles;
    #withRelaxedProfiles = false;

    result;

    /*
     *  addProfile(name: string, definition: object) : undefined
     *
     *  adds a properly defined profile object to #profiles array.
     *
     *  ex: addProfile("profile1", { num1: { Number: true }, num2: { Number: false }, str1: { String: false } })
     *
     */

    withProfile(name, profile, ...classes) {
        /*
         *  [x] should validate profile here and throw error here
         *  [x] should throw without changing contents of #profiles
         *
         */

        const _name = typeof name == "string" && name.length > 1 && name || `profile-${newUuidShort()}`;
        const self = this;

        self.#classes = self.#classes || [ ];
        self.#profiles = self.#profiles || { };

        //if (self.#profiles.find(profile => profile.name === _name)) throw Error("ArgsParser.addProfile(): argument 'name' missing or duplicate");
        if (self.#profiles[_name]) throw Error(`ArgsParser.addProfile(): argument 'name' missing or duplicate for value '${_name}'`);
        if (!(profile && profile instanceof Object)) throw Error("ArgsParser.addProfile(): argument 'profile' missing or invalid");

        this.withClasses(...classes);

        const cleanedProfile = { };

        Object.getOwnPropertyNames(profile).forEach(fieldKey => {
            const typeKeys = profile[fieldKey] && Object.getOwnPropertyNames(profile[fieldKey]);
            const typeKey = typeKeys && typeKeys.length === 1 && Utilities.parseType(typeKeys[0], ...self.#classes) || undefined;

            // there should be a single typeKey; if there is, add it to the array of
            // cleaned profiles and continue; if there isn't and we have strict profile
            // checking, throw an error; otherwise, continue;

            if (!typeKey && self.hasStrictProfiles) throw Error(`ArgsParser.addProfile(): invalid profile defined for '${fieldKey}' - type '${typeKeys[0]}' is undefined`);

            // add to the cleanedProfile object; required is set to true on strict true value

            return cleanedProfile[fieldKey] = { type: typeKey, required: profile[fieldKey][typeKeys[0]] === true };
        });

        return Object.keys(cleanedProfile).length > 0
            ? (self.#profiles[_name] = cleanedProfile) && self
            : self.hasStrictProfiles && throw Error(`ArgsParser.addProfile(): invalid profile ${name}`) || self;
    }

    static withProfile(name, profile, ...classes) {
        return new this().withProfile(name, profile, ...classes);
    }

    /*
     *  addProfiles(profiles: object) : undefined
     *
     *  passes individual projects objects from object parameter
     *  to addProfile.
     *
     */

    withProfiles(profiles, ...classes) {
        if (!(profiles && profiles instanceof Object)) throw Error("ArgsParser.addProfiles(): argument 'profiles' is invalid");

        this.withClasses(...classes);

        const keys = Object.getOwnPropertyNames(profiles);

        if (keys.length === 0) throw Error("ArgsParser.addProfiles(): argument 'profiles' is invalid");

        keys.forEach(key => this.withProfile(key, profiles[key]));

        return this;
    }

    static withProfiles(profiles, ...classes) {
        return new this().withProfiles(profiles, ...classes);
    }

    /*
     *  hasRelaxedProfiles() : bool
     *
     *  returns the state of #withRelaxedProfiles flag.
     */

    get hasRelaxedProfiles() {
        return this.#withRelaxedProfiles;
    }

    /*
     *  hasStrictProfiles() : bool
     *
     *  returns the opposite state of #withRelaxedProfiles flag.
     */

    get hasStrictProfiles() {
        return !this.#withRelaxedProfiles;
    }

    get profiles() {
        return this.#profiles;
    }

    /*
     *  withClass(cls: Array) : ArgsParser
     *
     *  adds a class to #classes internal array; class names are passed in
     *  as strings when using addProfile so the parser is unaware of the
     *  actual classes; this is a kludge for the time being to allow the parser
     *  to compare args to class types.
     *
     */

    withClass(cls) {
        Utilities.isClass(cls) &&
        (this.#classes = this.#classes || [ ]) &&
        !this.#classes.includes(cls) &&
        this.#classes.push(cls);

        return this;
    }

    static withClass(cls) {
        return new this().withClass(cls);
    }

    /*
     *  withClasses(classes: Array) : ArgsParsers
     *
     *  arrayed version of withClass();
     *
     */

    withClasses(...classes) {
        if (!classes) return this;

        classes.forEach(cls => this.withClass(cls));

        return this;
    }

    static withClasses(...classes) {
        return new this().withClasses(...classes);
    }

    /*
     *  withRelaxedProfiles() : undefined
     *
     *  flags the profile parser to ignore errant profile data
     *  rather than throwing an error.
     *
     */

    withRelaxedProfiles() {
        this.#withRelaxedProfiles = true;

        return this;
    }

    static withRelaxedProfiles() {
        return new this().withRelaxedProfiles();
    }

    /*
     *  withStrictProfiles() : ArgsParser
     *
     *  flags the profile parser to strictly parse added profiles;
     *  addProfile() will throw if profile parameter contains
     *  errant information.
     *
     *  note that this will only affect new calls to addProfile/addProfiles;
     *  profiles already been added should be scrubbed of invalid profiles.
     *
     */

    withStrictProfiles() {
       this.#withRelaxedProfiles = false;

       return this;
    }

    static withStrictProfiles() {
        return new this().withStrictProfiles();
    }

    /*
     *  parse(argsParm : arguments): Result
     *
     */

    parse(argsParm) {
        /*
         *  [x] evaluate profiles in order
         *  [x] first profile that matches wins
         *  [ ] order of fulfillment: class, function, array, object;
         *      classes typeof into function, and arrays typeof into
         *      object.
         *
         */

        this.result = new Result();

        const profiles = Object.entries(this.#profiles || { });

        profiles.length === 0 && throw Error("ArgsParser.parse(): parser does not contain any valid profiles");
        !(isArguments(argsParm)) && throw Error("ArgsParser.parse(): argsParm argument is not valid");

        const args = Array.from(argsParm);
        const parser = this;

        const evaluate = function(profile) {
            const [ profileName, profileDefinition ] = profile;
            const errors = [ ];
            const values = { };
            let argsIndex = 0;

            Object.entries(profileDefinition).forEach(field => {
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
                // in all circumstances proceed to the next field.

                (match && (values[fieldName] = match) && (argsIndex = args.indexOf(match))) || required && errors.push(fieldName);
            });

            // if we have errors then the profile doesn't match - set the errors
            // for the profile on the result object and return true to continue
            // processing entries; otherwise we have a match, so set the result
            // object and return false to stop processing the profile entries;

            return errors.length > 0 && (parser.result.errors[profileName] = errors) && true ||
                   (parser.result.name = profileName) && (parser.result.definition = profileDefinition) && (parser.result.values = values) && false ||
                   false;
        }

        Object.entries(this.#profiles).every(evaluate);

        return this.result.name !== undefined;
    }
}
