import "jest-extended";
import ArgsParser from "../../src/base/classes/ArgsParser";

describe("ArgsParser", () => {
    it("should instantiate without errors", () => {
        expect(() => new ArgsParser()).not.toThrow();
        expect(() => new ArgsParser().addProfile("test", { field1: { String: true }})).not.toThrow();
        expect(() => ArgsParser.addProfile("test", { field1: { String: true }})).not.toThrow();
        expect(() => new ArgsParser().addProfiles({ "test": { field1: { String: true }}})).not.toThrow();
        expect(() => ArgsParser.addProfiles({ "test": { field1: { String: true }}})).not.toThrow();
        expect(() => new ArgsParser().withRelaxedProfiles()).not.toThrow();
        expect(() => new ArgsParser().withStrictProfiles()).not.toThrow();
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

        let parser;

        expect(() => parser = new ArgsParser()).not.toThrow();
        expect(() => parser.addProfile("profile1", { field1: { BigInt: true }, field2: { Class1: false }})).not.toThrow();
    });


    it("should throw when adding invalid profiles with strict profile checking turned on", () => {
        class Class1 { };

        let parser;
        let badProfile1 = { field1: undefined },
            badProfile2 = { field1: { Object: false }};


        expect(() => parser = new ArgsParser()).not.toThrow();

        // should throw on duplicate profile name
        expect(() => parser.addProfile("test1", { field1: { String: true }})).not.toThrow();
        expect(() => parser.addProfile("test1", { field1: { String: false }})).toThrow();

        // should throw on undefined or unsupported types
        expect(() => parser.addProfile("test2", badProfile1)).toThrow();
        expect(() => parser.addProfile("test2", badProfile2)).toThrow();
    });
});
