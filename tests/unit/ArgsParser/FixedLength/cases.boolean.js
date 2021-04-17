const makeArgs = (rawArgs) => function() { return arguments }(...Object.entries(rawArgs).map(arg => arg[1]));

export const profiles = {
    single: { profile1: { field1: { Boolean: true } } },
    double: { profile2: { field1: { Boolean: true }, field2: { Boolean: true }}}
}

export const results = {
    single: {
        errors: { },
        profileName: "boolProfile1",
        profileDefinition: profiles.single,
        values: { field1: false }
    },
    double: {
        errors: { },
        profileName: "boolProfile2",
        profileDefinition: profiles.double,
        values: { field1: true, field2: false }
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
