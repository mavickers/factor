import { Configurable } from "../src/base/interfaces";
import { configurable, mappable } from "../src/base/classes/decorators";

describe("Configurable", () => {
    it("Should instantiate an instance properly with its mixins", () => {
        class Config1 extends Configurable { }
        @configurable class Config2 { }

        let config1, config2;

        expect(() => config1 = new Config1()).not.toThrow();
        expect(() => config2 = new Config2()).not.toThrow();
        expect(Config1.isConfigured).toEqual(false);
        expect(Config2.isConfigured).toEqual(false);
        expect(Config1.configuration).toEqual({ });
        expect(Config2.configuration).toEqual({ });
        expect(() => Config1.configure({ "first": 1 })).not.toThrow();
        expect(() => Config2.configure({ "second": 2 })).not.toThrow();
        expect(Config1.configuration).toEqual({ "first": 1 });
        expect(Config2.configuration).toEqual({ "second": 2 });
    })
})
