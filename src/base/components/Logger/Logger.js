import Utilities from "../../Utilities";
import LogMessage from "./LogMessage";
import Location from "../../classes/Location";

export default class Logger {
    // todo: group functionality - will need to be support nested groups which indent content accordingly.

    #id;
    #logs;
    #group = null;

    constructor() {
        this.#id = Utilities.newUuidShort();
        this.#logs = [ ];
    }

    clear() {
        this.#logs = [ ];

        return this;
    }

    flush() {
        if (this.#logs.length > 0) console.log(this.formattedLogs);
        this.clear();

        return this;
    }

    get formattedLogs() {
        const objects = this.#logs.map(log => log.messages.filter(message => !Utilities.isString(message))).flat();

        let output = "";

        this.#logs.forEach(log => {
            const logIndex = this.#logs.indexOf(log);
            const coordinates = `[${log.location.lineNumber.padStart(4,"0")}:${log.location.colNumber.padStart(4, "0")}]`;
            const fileNameHeader = `\n=== ${this.#id} ${log.location.fileName} `.padEnd(80, "=");
            const withHeader = (logIndex === 0 || log.location.file[0] !== this.#logs[logIndex - 1].location.file[0]);

            output += withHeader && fileNameHeader || "";

            log.messages.forEach(message => {
                const isFirst = log.messages.indexOf(message) === 0;
                const indent = isFirst ? 0 : coordinates.length;

                output += '\n' + (log.messages.indexOf(message) === 0 && coordinates || "");

                output += Utilities.isString(message)
                    ? `${" ".repeat(indent)} ${message}`
                    : (message || Utilities.isBoolean(message)) && `            {{obj}}`.padStart(indent, " ") || "";
            });
        });

        objects.forEach(object => {
            output = object && output.replace(/\{\{obj\}\}/, JSON.stringify(object, null, 2)?.replace(/[\r\n]+/gm, "\n            ") ?? "<< unable to serialize object >>") || output;
        });

        return output;
    }

    log(...args) {
        const locations = args.filter(arg => Utilities.isType(arg, Location) && arg);
        const location = locations && locations.length > 0 && locations.slice(-1) || Location.locate(2);
        const messages = args.filter(arg => !Utilities.isType(arg, Location));

        //this.#logs.push(new LogMessage(location, ...(messages.length > 0 && messages || [ "" ])));
        messages.length > 0 && this.#logs.push(new LogMessage(location, ...messages));

        return this;
    }
}
