/*  types.test.js
 *
 *  ArgsParser looping tests for js types.
 */

import "jest-extended";
import ArgsParser from "../../../src/base/classes/ArgsParser";
import { RandomGenerator } from "../../../src/base/pipelines";
import { PipelineArgs } from "../../../src/base/components/Pipeline";


const makeArgs = (rawArgs) => function() { return arguments }(...Object.entries(rawArgs).map(arg => arg[1]));
const randomGenerator = (type) => RandomGenerator.execute(new PipelineArgs(type)).data.targetValue;

describe("ArgsParser Type Tests", () => {
    const types = [ Array, BigInt, Boolean, Number, String, Symbol ];

    test.concurrent.each(types)("Primitives/Structured Loop Tests Set", async (type) => {
       const profiles = {
           single: { field1: { [type.name]: true }},
           double: { field1: { [type.name]: true }, field2: { [type.name]: true }},
       };
       const args = {
           single: { field1: randomGenerator(type) },
           double: { field1: randomGenerator(type), field2: randomGenerator(type) }
       };

       let parser;

       expect(() => parser = ArgsParser.withProfiles(profiles)).not.toThrow();
       expect(parser.parse(makeArgs(args.single))).toBeTrue();
       expect(parser.result.values).toEqual(args.single);
       expect(parser.parse(makeArgs(args.double))).toBeTrue();
       expect(parser.result.values).toEqual(args.double);
    });
});

