/*  types.fixed.test.js
 *
 *  ArgsParser looping tests for js types.
 */

import "jest-extended";
import ArgsParser from "../../../src/base/classes/ArgsParser";
import Utilities from "../../../src/base/Utilities";
import { getType, isType } from "../../../src/base/Utilities/types";
import { getClassName, isClass, isClassed } from "../../../src/base/Utilities/classes";

const makeArgs = (rawArgs) => function() { return arguments }(...Object.entries(rawArgs).map(arg => arg[1]));
const { getRandom } = Utilities;

describe("ArgsParser Type Tests - Fixed Length Arguments", () => {
    const types = [ Array, BigInt, Boolean, Date, Function, Map, Number, Object, Set, String, Symbol, WeakMap, WeakSet ]
                  .map(type => Object.assign(type, { toString: function() { return this.name; }}));

    test("temp 1", () => {
        let parser;
        const profiles = {
            prof1: { field1: { Boolean: true }, field2: { String: true }, field3: { Number: true }, field4: { Object: false }, field5: { String: true } }
        };
        const args = {
            args1: { field5: getRandom(BigInt), field6: getRandom(Array), field7: getRandom(String), field1: getRandom(Number), field2: getRandom(Boolean), field3: getRandom(String), field4: getRandom(Number) }
        };

        console.log(Math.random(), getRandom({ type: Number, whole: false }).toString(36)[2]);


        // expect(() => parser = ArgsParser.withVaryingArguments().withProfiles(profiles)).not.toThrow();
        // expect(parser.parse(makeArgs(args.args1))).toBeTrue();
    });
});


