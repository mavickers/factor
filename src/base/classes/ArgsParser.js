import Flags from "./Flags";
import Utilities from "../Utilities";

const primitives = [ BigInt, Boolean, Number, String, Symbol ];
const { newUuidShort } = Utilities;
const

export default class {
    #lastArgs;
    #profiles;
    #withRelaxedProfiles = false;

    /*
     *  addProfile(name: string, definition: object) : undefined
     *
     *  adds a properly defined profile object to #profiles array.
     *
     */

    addProfile(name, profile) {
        /*
         *  [ ] should validate profile here and throw error here
         *  [ ] should throw without changing contents of #profiles
         *
         */

        const _name = name && typeof name == "string" && name.length > 1 || `profile-${newUuidShort()}`;

        if (this.#profiles.find(profile => profile.name === _name)) throw Error("ArgsParser.addProfile(): argument 'name' missing or duplicate");
        if (!(profile && profile instanceof Object)) throw Error("ArgsParser.addProfile(): argument 'profile' missing or invalid");

        const _profile = { };
        const keys = Object.getOwnPropertyNames(profile);

        keys.forEach(key => {
           const __name = key;
           const __keys = Object.getOwnPropertyNames(profile[key]);

           // if (!this.#withRelaxedProfiles && !(__keys && __keys.length == 1 && ))
        });

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
     *  withRelaxedProfiles() : undefined
     *
     *  flags the profile parser to ignore errant profile data
     *  rather than throwing an error.
     *
     */

    withRelaxedProfiles() {
        this.#withRelaxedProfiles = false;
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
