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
            const logIndex = this.#logs.indexOf(log);
            const coordinates = `[${log.location.lineNumber}:${log.location.colNumber}]`;
            const fileNameHeader = `\n=== ${log.location.fileName} `.padEnd(80, "=");
            const withHeader = (logIndex === 0 || log.location.file[0] !== this.#logs[logIndex - 1].location.file[0]);

            output += withHeader && fileNameHeader || "";

            log.messages.forEach(message => {
                const isFirst = log.messages.indexOf(message) === 0;
                const indent = isFirst ? 0 : coordinates.length;

                output += '\n' + (log.messages.indexOf(message) === 0 && coordinates || "");

                output += Utilities.isString(message)
                    ? `${" ".repeat(indent)} ${message}`
                    : (message || Utilities.isBoolean(message)) && `  {{obj}}`.padStart(indent, " ") || "";
            });

        });

        objects.forEach(object => {
            output = output.replace(/\{\{obj\}\}/, JSON.stringify(object, null, 2).replace(/[\r\n]+/gm, "\n  "));
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
