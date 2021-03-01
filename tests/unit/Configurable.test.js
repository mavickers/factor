import { Configurable } from "../../src/base/interfaces";
import { configurable } from "../../src/base/classes/decorators";

class Config1 extends Configurable { }
@configurable class Config2 { }

let config1, config2;

describe("Configurable", () => {
    beforeEach(() => {
        config1 = null;
        config2 = null;
    });

    it("should instantiate and work properly", () => {
        expect(() => config1 = new Config1()).not.toThrow();
        expect(() => config2 = new Config2()).not.toThrow();
        expect(Config1.isFrozen).toEqual(false);
        expect(Config2.isFrozen).toEqual(false);
        expect(Config1.configuration).toEqual({});
        expect(Config2.configuration).toEqual({});
    });

    it("should assign and retrieve configuration properly", () => {
        expect(() => Config1.configure({ "first": 1 })).not.toThrow();
        expect(() => Config2.configure({ "second": 2 })).not.toThrow();
        expect(Config1.configuration).toEqual({ "first": 1 });
        expect(Config2.configuration).toEqual({ "second": 2 });
        expect(() => Config1.configuration["third"] = 3).not.toThrow();
        expect(() => Config2.configuration["fourth"] = 4).not.toThrow();
        expect(Config1.configuration).toEqual({ "first": 1, "third": 3 });
        expect(Config2.configuration).toEqual({ "second": 2, "fourth": 4 });
    });

    it("should freeze configuration properly", () => {
        expect(() => Config1.configure({ "first": 1 })).not.toThrow();
        expect(() => Config2.configure({ "second": 2 })).not.toThrow();
        expect(() => Config1.sealConfiguration()).not.toThrow();
        expect(() => Config2.sealConfiguration()).not.toThrow();
        expect(() => Config1.configuration["first"] = "1").toThrow();
        expect(() => Config2.configuration["second"] = "2").toThrow();
        expect(() => Config1.configure({ "first": "1" })).toThrow();
        expect(() => Config2.configure({ "second": "2" })).toThrow();
    })
})
