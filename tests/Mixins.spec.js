import "jest-extended";
import { Configurable, Describable, Mappable } from "../src/base/interfaces";
import Classes from "../src/base/Classes.js";
import { describable, mappable } from "../src/base/classes/decorators";

describe("Mixins", () => {
    it("should determine basic mixins", () => {
        @describable
        class Model1 { }
        @mappable @describable
        class Model2 { }
        class Model3 extends Describable { }
        class Model4 extends Classes(Describable, Mappable) { };

        expect(Model1.isMixedWith(Describable)).toBeTrue();
        expect(Model2.isMixedWith(Describable)).toBeTrue();
        expect(Model2.isMixedWith(Mappable)).toBeTrue();
        // "extends" does not actuate mixin so no inheritance is recorded,
        // the function is not even stapled to the class.
        expect(() => Model3.isMixedWith(Describable)).toThrow();
        // but Classes() calls Mixins
        expect(Model4.isMixedWith(Describable)).toBeTrue();

        expect(Model1.isMixedWith(Configurable)).toBeFalse();
        expect(Model4.isMixedWith(Configurable)).toBeFalse();
    });
})
