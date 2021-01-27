import Utilities from "../../Utilities";
import Location from "../../classes/Location";

export default class LogMessage {
    #messages;
    #location;
    #group;

    constructor(...args) {
        this.#group = args.filter(arg => arg && arg.id).slice(-1)[0] || { id: Utilities.newUuidShort() };
        this.#location = args.filter(arg => Utilities.isType(arg, Location)).slice(-1)[0];
        this.#messages = args.filter(arg => !Utilities.isType(arg, Location));

        if (!this.#location) throw new Error("Location(): a Location argument is required");
    }

    get group() {
        return this.#group;
    }

    get location() {
        return this.#location;
    }

    get messages() {
        return this.#messages;
    }
}
