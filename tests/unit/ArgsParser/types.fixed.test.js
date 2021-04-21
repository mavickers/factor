/*  types.fixed.test.js
 *
 *  ArgsParser looping tests for js types.
 */

import "jest-extended";
import ArgsParser from "../../../src/base/classes/ArgsParser";
import Utilities from "../../../src/base/Utilities";

const makeArgs = (rawArgs) => function() { return arguments }(...Object.entries(rawArgs).map(arg => arg[1]));
const { getRandom } = Utilities;

describe("ArgsParser Type Tests - Fixed Length Arguments", () => {
    const types = [ Array, BigInt, Boolean, Date, Function, Map, Number, Object, Set, String, Symbol, WeakMap, WeakSet ]
                  .map(type => Object.assign(type, { toString: function() { return this.name; }}));

    test.concurrent.each(types)(`primitive/structure type loop: %s`, async (type) => {
        // this test loops through the types and creates a single/double profile for
        // each as well as single/double set of arguments; makeArgs() above should
        // create an arguments object that can be used to both generate arguments
        // to send to the parser as well as compare back to the parser result values
        // to make sure the values match.

        const profiles = {
            single: { field1: { [type.name]: true }},
            double: { field1: { [type.name]: true }, field2: { [type.name]: true }},
        };
        const args = {
            single: { field1: getRandom(type) },
            double: { field1: getRandom(type), field2: getRandom(type) }
        };

        let parser;

        expect(() => parser = ArgsParser.withProfiles(profiles)).not.toThrow();
        expect(parser.parse(makeArgs(args.single))).toBeTrue();
        expect(parser.result.values).toEqual(args.single);
        expect(parser.parse(makeArgs(args.double))).toBeTrue();
        expect(parser.result.values).toEqual(args.double);
    });

    test("temp 1", () => {
       const profiles = {
           prof1: { field1: { Boolean: true }, field2: { String: true }, field3: { Number: true } }
       };
       const args = {
           args1: { field1: getRandom(Number), field2: getRandom(Boolean), field3: getRandom(String) }
       };

       expect(() => parser = ArgsParser.withProfiles())
    });
});


