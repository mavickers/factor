/*  general.test.js
 *
 *  this is a set of tests that target general functionality of
 *  the ArgsParser class.
 */

import "jest-extended";
import ArgsParser from "../../../src/base/classes/ArgsParser";
import Utilities from "../../../src/base/Utilities";

const args = function() { return arguments };

describe("ArgsParser With Standard Evaluator", () => {
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

    it("should handle invalid parameters (args, profiles, classes) correctly", () => {
        let parser, Class1;

        expect(() => parser = new ArgsParser()).not.toThrow();

        // profiles
        expect(() => parser.withProfile()).toThrow("missing");
        expect(() => parser.withProfile("profile1", { field1: { Class1: true } })).toThrow(/type\s\'Class1\'\sis\sundefined/);
        expect(() => parser.withProfile("profile1", { field1: { String: true }})).not.toThrow();
        expect(() => parser.withProfile("profile1", { field1: { String: true }})).toThrow("duplicate");

        // args
        expect(() => parser.parse()).toThrow("args argument");
        expect(() => parser.parse("test")).toThrow("args argument");
        expect(() => parser.parse(args(1, 2))).not.toThrow();
        expect(parser.result?.errors?.profile1?.[0]).toEqual("*");
        expect(() => parser.parse(args(1))).not.toThrow();
        expect(parser.result?.errors?.profile1?.[0]).toEqual("field1");

        // classes
        expect(() => parser.withClass(Class1)).toThrow("invalid class argument");
        expect(() => parser.withClass(Class1 = class { })).not.toThrow();
        expect(() => parser.withProfile("profile2", { field1: { Class1: true }})).not.toThrow();
        expect(() => parser.parse("test")).toThrow("args argument");
        expect(() => parser.parse(args(new Class1(), "test"))).not.toThrow();
        expect(parser.result?.errors?.profile1).not.toBeUndefined();
        expect(parser.result?.errors?.profile2).not.toBeUndefined();
        expect(parser.result?.errors?.profile2?.[0]).toEqual("*");
        expect(() => parser.parse(args(1))).not.toThrow();
        expect(parser.result?.errors?.profile1).not.toBeUndefined();
        expect(parser.result?.errors?.profile2).not.toBeUndefined();
        expect(parser.result?.errors?.profile2?.[0]).toEqual("field1");
    });

    it("should throw when adding invalid profiles with strict profile checking turned on", () => {
        class Class1 { };

        let parser;
        let badProfile1 = { field1: undefined },
            badProfile2 = { field1: { Class1: false }};


        expect(() => parser = new ArgsParser()).not.toThrow();

        // should throw on duplicate profile name
        expect(() => parser.withProfile("test1", { field1: { String: true }})).not.toThrow();
        expect(() => parser.withProfile("test1", { field1: { String: false }})).toThrow();

        // should throw on undefined or unsupported types
        expect(() => parser.withProfile("test2", badProfile1)).toThrow();
        expect(() => parser.withProfile("test2", badProfile2)).toThrow();
    });
});
