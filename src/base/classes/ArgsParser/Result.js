export default class {
    errors = { };        // errors for each profile... { profile1: [ field1, field2, ..., fieldN ] }
    name = undefined;    // the matching profile name... "{{ name }}"
    profile = undefined; // the matching profile...
    definition = { };    // the matching profile definition... { field1: { type: type, required: true/false }, ..., fieldN: { type: type, required: true/false } }
    values = { };        // field values for the matching profile... { field1: val1, ... fieldN: valN }
}
