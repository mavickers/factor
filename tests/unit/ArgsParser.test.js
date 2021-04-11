import "jest-extended";
import ArgsParser from "../../src/base/classes/ArgsParser";
import Utilities from "../../src/base/Utilities";

const args = function() { return arguments };

describe("ArgsParser", () => {
    it("should instantiate without errors", () => {
        expect(() => new ArgsParser()).not.toThrow();
        expect(() => new ArgsParser().withProfile("test", { field1: { String: true }})).not.toThrow();
        expect(() => ArgsParser.withProfile("test", { field1: { String: true }})).not.toThrow();
        expect(() => new ArgsParser().withProfiles({ "test": { field1: { String: true }}})).not.toThrow();
        expect(() => ArgsParser.withProfiles({ "test": { field1: { String: true }}})).not.toThrow();
        expect(() => new ArgsParser().withRelaxedProfiles()).not.toThrow();
        expect(() => ArgsParser.withRelaxedProfiles()).not.toThrow();
        expect(() => new ArgsParser().withStrictProfiles()).not.toThrow();
        expect(() => ArgsParser.withStrictProfiles()).not.toThrow();
    });

    it("should set relaxed profile checking correctly", () => {
       let parser;

       expect(() => parser = new ArgsParser()).not.toThrow();
       expect(parser.hasRelaxedProfiles).toBeFalse();
       expect(parser.hasStrictProfiles).toBeTrue();
       expect(() => parser.withRelaxedProfiles()).not.toThrow();
       expect(parser.hasRelaxedProfiles).toBeTrue();
       expect(parser.hasStrictProfiles).toBeFalse();

       expect(() => parser = ArgsParser.withStrictProfiles()).not.toThrow();
       expect(parser.hasRelaxedProfiles).toBeFalse();
       expect(parser.hasStrictProfiles).toBeTrue();
       expect(() => parser.withRelaxedProfiles()).not.toThrow();
       expect(parser.hasRelaxedProfiles).toBeTrue();
       expect(parser.hasStrictProfiles).toBeFalse();

       expect(() => parser = ArgsParser.withRelaxedProfiles()).not.toThrow();
       expect(parser.hasRelaxedProfiles).toBeTrue();
       expect(parser.hasStrictProfiles).toBeFalse();
       expect(() => parser.withStrictProfiles()).not.toThrow();
       expect(parser.hasRelaxedProfiles).toBeFalse();
       expect(parser.hasStrictProfiles).toBeTrue();
    });

    it("should allow valid profiles to be added", () => {
        class Class1 { };
        class Class2 { };

        let parser;

        expect(() => parser = new ArgsParser()).not.toThrow();
        // primitives
        expect(() => parser.withProfile("profile1", { field1: { BigInt: true }, field2: { Boolean: false }, field3: { Number: false }, field4: { String: true }, field5: { Symbol: true }})).not.toThrow();
        // structurals
        expect(() => parser.withProfile("profile2", { field1: { Array: true }, field2: { Date: false }, field3: { Function: false }, field4: { Map: true }, field5: { Object: true }, field6: { Set: true }, field7: { WeakMap: true }, field8: { WeakSet: true }})).not.toThrow();
        // classes
        expect(() => parser.withProfile("profile3", { field1: { Class1: true }, field2: { Class2: false }}, Class1, Class2)).not.toThrow();
    });

    it("should handle lack of profiles, invalid profiles, or invalid arguments passed to parser", () => {
        let parser, result;

        expect(() => parser = new ArgsParser()).not.toThrow();
        expect(() => parser.parse()).toThrow("valid profiles");

        expect(() => parser.withProfile()).toThrow("missing");
        expect(() => parser.withProfile("profile1", { field1: { Test: true }})).toThrow("undefined");

        expect(() => parser.withProfile("profile1", { field1: { String: true }})).not.toThrow();
        expect(() => parser.withProfile("profile1", { field1: { String: true }})).toThrow("duplicate");
        expect(() => parser.parse()).toThrow("argument");
    });

    it("should process bigint properly", () => {
        const profiles = {
            profile1: { field1: { BigInt: true }, field2: { BigInt: false }, field3: { String: true } },
            profile2: { field1: { BigInt: true }, field2: { BigInt: true } }
        };
        let parser, bigint1, bigint2;

        expect(() => parser = ArgsParser.withProfile("profile1", profiles.profile1)).not.toThrow();
        expect(() => parser.parse(args("1", "2"))).not.toThrow();
        expect(parser.result?.errors?.profile1).toBeArray();
        expect(parser.result?.errors?.profile1?.length).toEqual(1);

        expect(() => parser = parser.withProfile("profile2", profiles.profile2)).not.toThrow();
        expect(() => parser.parse(args("1", "2"))).not.toThrow();
        expect(parser.result?.errors?.profile2).toBeArray();
        expect(parser.result?.errors?.profile2?.length).toEqual(2);

        bigint1 = 1234n;
        bigint2 = 5678n;

        expect(() => parser.parse(args(bigint1, "1234"))).not.toThrow();
        console.log(parser.result);
    });

    it("should throw when adding invalid profiles with strict profile checking turned on", () => {
        class Class1 { };

        let parser;
        let badProfile1 = { field1: undefined },
            badProfile2 = { field1: { Object: false }};


        expect(() => parser = new ArgsParser()).not.toThrow();

        // should throw on duplicate profile name
        expect(() => parser.withProfile("test1", { field1: { String: true }})).not.toThrow();
        expect(() => parser.withProfile("test1", { field1: { String: false }})).toThrow();

        // should throw on undefined or unsupported types
        expect(() => parser.withProfile("test2", badProfile1)).toThrow();
        expect(() => parser.withProfile("test2", badProfile2)).toThrow();
    });
});
