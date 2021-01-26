import Utilities from "../Utilities";

export default class Location {
    #colNumber;
    #file;
    #fileName;
    #lineNumber;
    #location;
    #stack;

    constructor(back = 0) {
        // todo: this should check for int
        back = Utilities.isNumber(back) && back || 0;

        try { throw new Error() }
        catch (err) {
            this.#stack = err.stack.split("\n").map(s => s.trim()).filter(s => s.startsWith("at "));
            this.#location = this.#stack[1 + back];
            this.#file = this.#location.split(" ").slice(-1)[0].split(":");
            this.#fileName = this.#file.length === 3 && this.#file[0].split("\/").slice(-1)[0] || this.#location.split(" ").slice(1).join(" ")
            this.#lineNumber = this.#file.length === 3 && this.#file[1] || 0;
            this.#colNumber = this.#file.length === 3 && this.#file[2].split(")")[0] || 0;
        }
    }

    get colNumber() { return this.#colNumber; };
    get file() { return this.#file; };
    get fileName() { return this.#fileName; };
    get lineNumber() { return this.#lineNumber; };
    get location() { return this.#location; };
    get stack() { return this.#stack; };

    static locate(back = 0) {
        return new Location(back);
    }
}
