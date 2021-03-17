import Flags from "./Flags";
import Utilities from "../Utilities";

const primitives = [ "BigInt", "Boolean", "Number", "String", "Symbol" ];
const { newUuidShort } = Utilities;

export default class {
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

    addProfile(name, profile) {
        /*
         *  [x] should validate profile here and throw error here
         *  [x] should throw without changing contents of #profiles
         *
         */

        const _name = name && typeof name == "string" && name.length > 1 || `profile-${newUuidShort()}`;
        const self = this;

        self.#profiles = self.#profiles || [];

        if (self.#profiles.find(profile => profile.name === _name)) throw Error("ArgsParser.addProfile(): argument 'name' missing or duplicate");
        if (!(profile && profile instanceof Object)) throw Error("ArgsParser.addProfile(): argument 'profile' missing or invalid");

        const cleanedProfile = { };

        Object.getOwnPropertyNames(profile).forEach(fieldKey => {
            const typeKeys = Object.getOwnPropertyNames(profile[fieldKey]);
            // todo: add class check
            const typeKey = typeKeys && typeKeys.length === 1 && primitives.find(p => p === typeKeys[0]) || undefined;

            // there should be a single typeKey; if there is, add it to the array of
            // cleaned profiles and continue; if there isn't and we have strict profile
            // checking, throw an error; otherwise, continue;

            if (typeKey) return cleanedProfile[fieldKey] = profile[fieldKey];
            if (self.hasStrictProfiles) throw Error(`ArgsParser.addProfile(): invalid profile defined for '${ fieldKey }'`);
        });

        self.#profiles.push(cleanedProfile);
    }

    static addProfile(name, profile) {
        return new this().addProfile(name, profile);
    }

    /*
     *  addProfiles(profiles: object) : undefined
     *
     *  passes individual projects objects from object parameter
     *  to addProfile.
     *
     */

    addProfiles(profiles) {
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
     *  withRelaxedProfiles() : undefined
     *
     *  flags the profile parser to ignore errant profile data
     *  rather than throwing an error.
     *
     */

    withRelaxedProfiles() {
        this.#withRelaxedProfiles = false;

        return this;
    }

    static withRelaxedProfiles() {
        return new this().withRelaxedProfiles();
    }

    /*
     *  withStrictProfiles() : undefined
     *
     *  flags the profile parser to strictly parse added profiles;
     *  addProfile() will throw if profile parameter contains
     *  errant information.
     *
     */

    withStrictProfiles() {
       this.#withRelaxedProfiles = true;

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
