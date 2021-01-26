import Utilities from "../Utilities";
import LogMessage from "./LogMessage";
import Location from "./Location";

export default class Logger {
    #logs;
    #group = null;

    constructor() {
        this.#logs = [ ];
    }

    clear() {
        this.#logs = [ ];

        return this;
    }

    get formattedLogs() {
        const objects = this.#logs.map(log => log.messages.filter(message => !Utilities.isString(message))).flat();
        const groups = this.#logs.map(log => log.group.id).reduce((acc, group) => { console.log(acc); return !acc.includes(group) && acc.push(group) || acc }, []);

        console.log(groups);

        let output = "";

        this.#logs.forEach(log => {
            output += `\r\n[ ${ log.location.fileName } ${ log.location.lineNumber }:${ log.location.colNumber } ]`;

            log.messages.forEach(message => {
                output += Utilities.isString(message) ? message && `\r\n  ${message}` || "" : message && `\r\n  {{obj}}` || "";
            });

        });
        objects.forEach(object => {
            output = output.replace(/\{\{obj\}\}/, JSON.stringify(object, null, 2).replace(/[\r\n]+/gm, "\r\n  "));
        });

        return output;
    }

    group(name) {
        this.#group = { name: name, id: Utilities.newUuidShort() };

        return this;
    }

    log(...args) {
        const locations = args.filter(arg => Utilities.isType(arg, Location) && arg);
        const location = locations && locations.length > 0 && locations.slice(-1) || Location.locate(1);
        const messages = args.filter(arg => !Utilities.isType(arg, Location));

        this.#logs.push(new LogMessage(location, ...messages));

        return this;
    }
}
