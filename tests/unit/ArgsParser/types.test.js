/*  types.test.js
 *
 *  ArgsParser looping tests for js types.
 */

import "jest-extended";
import ArgsParser from "../../../src/base/classes/ArgsParser";
import bigintTestCases from "./FixedLength/cases.bigint";
import booleanTestCases from "./FixedLength/cases.boolean";
import stringTestCases from "./FixedLength/cases.string";

// general note - JSON.parse does not know how to handle BigInt so
// the checks for bigint values in results using toEqual() have
// to be strung out a bit to examine the values objects precisely.

const testCases = [ ...bigintTestCases, ...stringTestCases ];

describe("ArgsParser With Fixed Length Evaluator - BigInt Tests", () => {
    test.each(testCases)("parse single valid BigInt args", (testCase) => {
        let parser;

        // todo: adjust the comparison here when JSON.parse starts
        //       supporting BigInt; JSON.parse does not know how to handle
        //       BigInt so the checks for bigint values in results using
        //       toEqual() have to be strung out a bit to examine the values
        //       objects precisely; for the time being we have to compare the
        //       individual properties of the result when using toEqual
        //       rather than the entire result object.

        expect(() => parser = ArgsParser.withProfiles(testCase.profiles)).not.toThrow();
        expect(parser.parse(testCase.args)).toBeTrue();
        expect(parser.result.errors).toEqual(testCase.results.errors);
        expect(parser.result.profileName).toEqual(testCase.results.profileName);
        expect(parser.result.profileDefinition).toEqual(testCase.profiles.profile1);
        expect(parser.result.values.field1).toEqual(testCase.results.values.field1);
    });
});
