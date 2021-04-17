import "jest-extended";
import ArgsParser from "../../../../src/base/classes/ArgsParser";

// general note - JSON.parse does not know how to handle BigInt so
// the checks for bigint values in results using toEqual() have
// to be strung out a bit to examine the values objects precisely.

const makeArgs = (rawArgs) => function() { return arguments }(...Object.entries(rawArgs).map(arg => arg[1]));

const profiles = {
    single: { profile1: { field1: { BigInt: true } } },
    double: { profile1: { field1: { BigInt: true }, field2: { BigInt: true }}}
};
const results = {
    single: {
        errors: { },
        profileName: "profile1",
        profileDefinition: profiles.single,
        values: { field1: 1234n }
    },
    double: {
        errors: { },
        profileName: "profile1",
        profileDefinition: profiles.double,
        values: { field1: 1234n, field2: 5678n }
    }
}
const args = {
    single: makeArgs(results.single.values),
    double: makeArgs(results.double.values)
};

describe("ArgsParser With Fixed Length Evaluator - BigInt Tests", () => {
    const testCases = [
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
    test.each(testCases)("parse single valid BigInt args", (testCase) => {
        let parser;

        // todo: adjust the comparison here when JSON.parse starts
        //       supporting BigInt; for the time being we have to
        //       compare the individual properties of the result when
        //       using toEqual rather than the entire result object.

        expect(() => parser = ArgsParser.withProfiles(testCase.profiles)).not.toThrow();
        expect(parser.parse(testCase.args)).toBeTrue();
        expect(parser.result.errors).toEqual(testCase.results.errors);
        expect(parser.result.profileName).toEqual(testCase.results.profileName);
        expect(parser.result.profileDefinition).toEqual(testCase.profiles.profile1);
        expect(parser.result.values.field1).toEqual(testCase.results.values.field1);
    });
});
