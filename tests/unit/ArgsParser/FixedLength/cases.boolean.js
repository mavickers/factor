const makeArgs = (rawArgs) => function() { return arguments }(...Object.entries(rawArgs).map(arg => arg[1]));

export const profiles = {
    single: { profile1: { field1: { Boolean: true } } },
    double: { profile2: { field1: { Boolean: true }, field2: { Boolean: true }}},
    triple: { profile3: { field1: { Boolean: true }, filed2: { Boolean: false }, field3: { Boolean: true }}}
}

export const results = {
    single: {
        errors: { },
        profileName: "profile1",
        profileDefinition: profiles.single,
        values: { field1: false }
    },
    double: {
        errors: { },
        profileName: "profile2",
        profileDefinition: profiles.double,
        values: { field1: true, field2: false }
    },
    triple: {
        errors: { },
        profileName: "profile3",
        profileDefinition: profiles.triple,
        values: { field1: true, field2: false, field3: false }
    }
};

export const args = {
    single: makeArgs(results.single.values),
    double: makeArgs(results.double.values),
    triple: makeArgs(results.triple.values)
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
    },
    {
        profiles: profiles.triple,
        args: args.triple,
        results: results.triple
    }
];

export default testCases;
