export default class {
    errors = { };                   // errors for each profile... { profile1: [ field1, field2, ..., fieldN ] }
    profileName = undefined;        // the matching profile name... "{{ name }}"
    profileDefinition = undefined;  // the matching profile definition... { field1: { type: required }, ..., fieldN: { type: required } }
    values = { };                   // field values for the matching profile... { field1: val1, ... fieldN: valN }
}
