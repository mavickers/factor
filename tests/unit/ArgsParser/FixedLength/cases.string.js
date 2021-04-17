const makeArgs = (rawArgs) => function() { return arguments }(...Object.entries(rawArgs).map(arg => arg[1]));

export const profiles = {
    single: { profile1: { field1: { String: true } } },
    double: { profile1: { field1: { String: true }, field2: { String: true }}}
}

export const results = {
    single: {
        errors: { },
        profileName: "profile1",
        profileDefinition: profiles.single,
        values: { field1: "first" }
    },
    double: {
        errors: { },
        profileName: "profile1",
        profileDefinition: profiles.double,
        values: { field1: "first", field2: "second" }
    }
};

export const args = {
    single: makeArgs(results.single.values),
    double: makeArgs(results.double.values)
};

export const testCases = [
    {
        profiles: profiles.single,
        args: args.single,
        results: results.single
    },
    {
        profiles: profiles.double,
        args: args.double,
        results: results.double
    }
];

export default testCases;
