import Flags from "./Flags";
import Utilities from "../Utilities";

const primitives = [ "BigInt", "Boolean", "Number", "String", "Symbol" ];
const { newUuidShort } = Utilities;

export default class {
    #classes;
    #lastArgs;
    #profiles;
    #withRelaxedProfiles = false;

    /*
     *  addProfile(name: string, definition: object) : undefined
     *
     *  adds a properly defined profile object to #profiles array.
     *
     *  ex: addProfile("profile1", { num1: { Number: true }, num2: { Number: false }, str1: { String: false } })
     *
     */

    addProfile(name, profile, classes) {
        /*
         *  [x] should validate profile here and throw error here
         *  [x] should throw without changing contents of #profiles
         *
         */

        const _name = typeof name == "string" && name.length > 1 && name || `profile-${newUuidShort()}`;
        const self = this;

        self.#profiles = self.#profiles || { };

        //if (self.#profiles.find(profile => profile.name === _name)) throw Error("ArgsParser.addProfile(): argument 'name' missing or duplicate");
        if (self.#profiles[_name]) throw Error(`ArgsParser.addProfile(): argument 'name' missing or duplicate for value '${_name}'`);
        if (!(profile && profile instanceof Object)) throw Error("ArgsParser.addProfile(): argument 'profile' missing or invalid");

        const cleanedProfile = { };

        Object.getOwnPropertyNames(profile).forEach(fieldKey => {
            const typeKeys = profile[fieldKey] && Object.getOwnPropertyNames(profile[fieldKey]);
            // todo: add class check
            const typeKey =
                typeKeys && typeKeys.length === 1 &&
                Utilities.parseType(typeKeys[0]) ||
                //(primitives.find(p => p === typeKeys[0]) || Utilities.isClass(typeKeys[0])) ||
                undefined;

            // there should be a single typeKey; if there is, add it to the array of
            // cleaned profiles and continue; if there isn't and we have strict profile
            // checking, throw an error; otherwise, continue;

            if (typeKey) return cleanedProfile[fieldKey] = profile[fieldKey];
            if (self.hasStrictProfiles) throw Error(`ArgsParser.addProfile(): invalid profile defined for '${ fieldKey }'`);
        });

        self.#profiles[_name] = cleanedProfile;
    }

    static addProfile(name, profile, classes) {
        return new this().addProfile(name, profile);
    }

    /*
     *  addProfiles(profiles: object) : undefined
     *
     *  passes individual projects objects from object parameter
     *  to addProfile.
     *
     */

    addProfiles(profiles, classes) {
        if (!(profiles && profiles instanceof Object)) throw Error("ArgsParser.addProfiles(): argument 'profiles' is invalid");

        const keys = Object.getOwnPropertyNames(profiles);

        if (keys.length === 0) throw Error("ArgsParser.addProfiles(): argument 'profiles' is invalid");

        keys.forEach(key => this.addProfile(key, profiles[key]));

        return this;
    }

    static addProfiles(profiles) {
        return new this().addProfiles(profiles);
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
     *  arrayed version of withClass*();
     *
     */

    withClasses(classes) {
        ((classes || [ ]) && Array.isArray(classes) && classes || [ classes ]).forEach(cls => this.withClass(cls));

        return this;
    }

    static withClasses(classes) {
        return new this().withClasses(classes);
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
     *  parse(): { errors: { profile1: [ field1, field2, ..., fieldN ] }, profile: this.#profiles[n] || null, values: { field1: val1, ..., fieldN: valN } }
     */
    parse() {
        /*
         *  [ ] evaluate profiles in order
         *  [ ] first profile that matches wins
         *  [ ] order of fulfillment: class, function, array, object;
         *      classes typeof into function, and arrays typeof into
         *      object.
         *
         */

        throw Error("not implemented");
    }
}
