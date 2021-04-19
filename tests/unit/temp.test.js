/*  types.test.js
 *
 *  ArgsParser looping tests for js types.
 */

import "jest-extended";
import ArgsParser from "../../src/base/classes/ArgsParser";
import { RandomGenerator } from "../../src/base/pipelines";
import { PipelineArgs } from "../../src/base/components/Pipeline";
//import testCases from "./ArgsParser/FixedLength/cases.boolean";
//import Utilities from "../../src/base/Utilities";

// general note - JSON.parse does not know how to handle BigInt so
// the checks for bigint values in results using toEqual() have
// to be strung out a bit to examine the values objects precisely.

const makeArgs = (rawArgs) => function() { return arguments }(...Object.entries(rawArgs).map(arg => arg[1]));
const randomGenerator = (type) => RandomGenerator.execute(new PipelineArgs(type)).data.targetValue;

describe("Temp Test", () => {
    test("temp", () => {
        console.log(randomGenerator(BigInt));
        // let parser, testCase = testCases[1];
        //
        // expect(() => parser = ArgsParser.withProfiles(testCase.profiles)).not.toThrow();
        // expect(parser.parse(makeArgs({ field1: true, field2: false }))).toBeTrue();
    });
});

