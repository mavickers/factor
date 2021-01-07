import objectScan from "object-scan";

class Enum {
    constructor(...args) {
        const obj = args && args.length > 0 && args[0];

        if (!obj) return;

        // create an enum from the key/values in the first arg
        for(let key in obj) this[key] = obj[key];

        Object.freeze(this);
    }

    /*
     * ContainsValues
     *
     * Rummages through the enum and returns true/false if it can find properties matching
     * a given value.
     *
     * - propertyValue - the value to be searched for.
     * - singleOnly (boolean, default = true) - specifies whether or not you want
     *   to report only a single match of the given value.
     *
     */
    ContainsValue = function(propertyValue, singleOnly) {
        if (propertyValue == null) return;
        if (singleOnly == null || typeof singleOnly !== "boolean") singleOnly = true;

        const matches = this.MatchedValues(propertyValue);

        return singleOnly ? matches.length === 1 : matches.length > 0;
    };

    /*
     *  MatchedValues
     *
     *  Rummages through the enum and returns an array of property names matching the given value.
     *  - propertyValue - the value to be searched for.
     *
     */
    MatchedValues = function(propertyValue) {
        if (propertyValue == null) return;

        return objectScan(["**"], { joined: false, filterFn: ({ value }) => value === propertyValue})(this);
    }
}

export default Enum;
