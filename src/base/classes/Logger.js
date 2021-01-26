import Utilities from "../Utilities";
import LogMessage from "./LogMessage";
import Location from "./Location";

export default class Logger {
    // todo: group functionality - will need to be support nested groups which indent content accordingly.

    #logs;
    #group = null;

    constructor() {
        this.#logs = [ ];
    }

    clear() {
        this.#logs = [ ];

        return this;
    }

    flush() {
        console.log(this.formattedLogs);
        this.clear();

        return this;
    }

    get formattedLogs() {
        const objects = this.#logs.map(log => log.messages.filter(message => !Utilities.isString(message))).flat();

        let output = "";

        this.#logs.forEach(log => {
            output += `\r\n[ ${ log.location.fileName } ${ log.location.lineNumber }:${ log.location.colNumber } ]`;

            log.messages.forEach(message => {
                output += Utilities.isString(message) ? message && `\r\n  ${message}` || "" : (message || Utilities.isBoolean(message)) && `\r\n  {{obj}}` || "";
            });

        });

        objects.forEach(object => {
            output = output.replace(/\{\{obj\}\}/, JSON.stringify(object, null, 2).replace(/[\r\n]+/gm, "\r\n  "));
        });

        return output;
    }

    // group(name) {
    //     this.#group = { name: name, id: Utilities.newUuidShort() };
    //
    //     return this;
    // }

    log(...args) {
        // todo: single call with multiple args should be on one line, maybe?
        const locations = args.filter(arg => Utilities.isType(arg, Location) && arg);
        const location = locations && locations.length > 0 && locations.slice(-1) || Location.locate(2);
        const messages = args.filter(arg => !Utilities.isType(arg, Location));

        this.#logs.push(new LogMessage(location, ...messages));

        return this;
    }
}
