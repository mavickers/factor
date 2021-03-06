import EvaluatorPipeline from "./EvaluatorPipeline";
import PipelineArgs from "../../components/Pipeline/PipelineArgs";
import Result from "./Result";
import Utilities from "../../Utilities";
import { isNotNil } from "../../Utilities/nil";

const { isArguments, newUuidShort } = Utilities;

export default class {
    #classes;
    #args;
    #profiles;
    #withRelaxedProfiles = false;
    #withVaryingArguments = false;

    result;

    /*
     *  withProfile(name: string, definition: object) : undefined
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

        self.withClasses(...classes);

        const cleanedProfile = { };

        Object.getOwnPropertyNames(profile).forEach(fieldKey => {
            const typeKeys = profile[fieldKey] && Object.getOwnPropertyNames(profile[fieldKey]);
            const typeKey = typeKeys && typeKeys.length === 1 && Utilities.parseType(typeKeys[0], ...self.#classes) || undefined;

            // there should be a single typeKey; if there is, add it to the array of
            // cleaned profiles and continue; if there isn't and we have strict profile
            // checking, throw an error; otherwise, continue;

            if (!typeKey && self.hasStrictProfiles) throw Error(`ArgsParser.addProfile(): invalid profile defined for '${fieldKey}' - type '${typeKeys[0]}' is undefined`);

            // add to the cleanedProfile object; required is set to true on strict true value

            return (cleanedProfile[fieldKey] = { type: typeKey, required: profile[fieldKey][typeKeys[0]] === true }) && true;
        });

        return Object.keys(cleanedProfile).length > 0
            ? (self.#profiles[_name] = { definition: cleanedProfile, profile: profile }) && self
            : self.hasStrictProfiles && throw Error(`ArgsParser.addProfile(): invalid profile ${name}`) || self;
    }

    static withProfile(name, profile, ...classes) {
        return new this().withProfile(name, profile, ...classes);
    }

    /*
     *  withProfiles(profiles: object) : undefined
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
     *  hasFixedArguments() : bool
     *
     *  returns the opposite state of #withVaryingArguments flag.
     */

    get hasFixedArguments() {
        return !this.#withVaryingArguments;
    };

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

    /*
     *  hasStandardArguments() : bool
     *
     *  returns the opposite state of #withVaryingArguments flag.
     */

    get hasStandardArguments() {
        return !this.#withVaryingArguments;
    }

    /*
     *  hasVaryingArguments() : bool
     *
     *  returns the state of #withVaryingArguments flag
     *
     */

    get hasVaryingArguments() {
        return this.#withVaryingArguments;
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
        if (!Utilities.isClass(cls)) throw Error("ArgsParser.withClass(): invalid class argument");

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

    /*  withFixedArguments() : ArgsParser
     *
     *  flags the parser to allow any number of arguments
     *  despite the number of fields defined in the profiles.
     */

    withFixedArguments() {
        this.#withVaryingArguments = false;

        return this;
    }

    static withFixedArguments() {
        return new this().withFixedArguments();
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

    /*  withVaryingArguments() : ArgsParser
     *
     *  flags the parser to only allow the same number of arguments
     *  as there are fields defined in profile under evaluation.
     */

    withVaryingArguments() {
        this.#withVaryingArguments = true;

        return this;
    }

    static withVaryingArguments() {
        return new this().withVaryingArguments();
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

    parse(args) {
        /*
         *  [x] evaluate profiles in order
         *  [x] first profile that matches wins
         *  [ ] the number of fields in a profile must match
         *      the number of args
         *  [ ] order of fulfillment: class, function, array, object;
         *      classes typeof into function, and arrays typeof into
         *      object.
         *
         */

        const parser = this;

        !(isArguments(args)) && throw Error("ArgsParser.parse(): args argument is not valid");

        const argsArray = Array.from(args);
        const profiles = Object.entries(parser.#profiles || { });
        const withLogging = false;

        profiles.length === 0 && throw Error("ArgsParser.parse(): parser does not contain any valid profiles");
        parser.result = new Result();

        const evaluator = (profile) => EvaluatorPipeline.execute(new PipelineArgs({ parser, argsArray, profile, withLogging }));

        profiles.every(evaluator);

        return isNotNil(parser.result.profileName);
    }
}
