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
});
