class Flags {
    #value = 0;

    constructor(...args) {
        const props = Object.getOwnPropertyNames(this.constructor);
        const blankProps = props.filter(prop => this.constructor[prop] == undefined);
        let power = 0;
        let flags = [];


        // iterate through all the static props that have an undefined value
        blankProps.forEach(prop => {
            const value = 2 ** power++;

            // remove the prop from the inheriting class...
            delete this.constructor[prop];
            // ...and add it back as a getter - we don't want to be able to
            // mutate the value after instantiation
            Object.defineProperty(this.constructor, prop, { get: () => value })
            flags.push(prop);
        });

        // take the prop names that we stored in the array and staple it as a
        // static property to the inheriting class - we can use the array when
        // validating arguments for flag mutation/reading; this should only happen
        // once for each child class.
        if (!(props.includes("_flags"))) Object.defineProperty(this.constructor, "_flags", { get: () => flags });

        this.set(...args);
    }

    get value() {
        return this.#value;
    }

    clear = function() {
        this.#value = 0;

        return this;
    }

    equals = function(...args) {
        if (!args && args.length === 1) return false;

        const { intArgs, stringArgs } = this.#validatedArgs(...args)
        const consolidatedArgs = [ ...intArgs, ...stringArgs ];

        if (consolidatedArgs.length !== 1) return false;

        return [ consolidatedArgs[0], this.constructor[consolidatedArgs[0]]].includes(this.#value);
    }

    hasAll = function(...args) {
        const value = this.#value;
        const ctor = this.constructor;
        const { intArgs, stringArgs } = this.#validatedArgs(...args);
        const intArgsFound = intArgs.filter(arg => (value & arg) != 0).length;
        const stringArgsFound = stringArgs.filter(arg => (value & ctor[arg]) != 0).length;

        return stringArgsFound + intArgsFound === args.length;
    }

    hasAny = function(...args) {
        const value = this.#value;
        const ctor = this.constructor;
        const { intArgs, stringArgs } = this.#validatedArgs(...args);

        if (intArgs.find(arg => value & arg)) return true;
        if (stringArgs.find(arg => value & ctor[arg])) return true;

        return false;
    }

    set = function(...args) {
        const ctor = this.constructor;
        const { intArgs, stringArgs } = this.#validatedArgs(...args);

        // iterate through matching string and int args, bitwise-or the value
        // onto the internal flag value
        intArgs.forEach(arg => this.#value = this.#value | arg);
        stringArgs.forEach(arg => this.#value = this.#value | ctor[arg]);

        return this;
    }

    #validatedArgs = function(...args) {
        const ctor = this.constructor;

        return {
            intArgs: args.filter(arg => Number.isInteger(arg) && ctor["_flags"].map(flag => ctor[flag]).includes(arg)) || [],
            stringArgs: args.filter(arg => typeof arg == "string" && arg.trim() && ctor[arg.trim()] && Number.isInteger(ctor[arg.trim()])) || []
        };
    }
}

export default Flags;
