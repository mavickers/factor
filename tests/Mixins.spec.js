import "jest-extended";
import { Configurable, Describable, Mappable } from "../src/base/interfaces";
import Classes from "../src/base/Classes.js";
import { describable, mappable } from "../src/base/classes/decorators";
import Mixin from "../src/base/classes/Mixin";

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
        expect(Model1.isMixedWith("Describable")).toBeTrue();
        expect(Model2.isMixedWith("Describable")).toBeTrue();
        expect(Model2.isMixedWith("Mappable")).toBeTrue();

        // "extends" does not actuate mixin so no inheritance is recorded,
        // the function is not even stapled to the class.
        expect(() => Model3.isMixedWith(Describable)).toThrow();
        expect(() => Model3.isMixedWith("Describable")).toThrow();
        // but Classes() calls Mixins
        expect(Model4.isMixedWith(Describable)).toBeTrue();
        expect(Model4.isMixedWith("Describable")).toBeTrue();

        expect(Model1.isMixedWith(Configurable)).toBeFalse();
        expect(Model1.isMixedWith("Configurable")).toBeFalse();
        expect(Model4.isMixedWith(Configurable)).toBeFalse();
        expect(Model4.isMixedWith("Configurable")).toBeFalse();
    });

    it("should determine complicated mixins", () => {
        class Class1 { }
        const decorator1 = function(target) { return Mixin(target, Class1); }

        @decorator1 class Class2 { }
        const decorator2 = function(target) { return Mixin(target, Class2); }

        @decorator2 class Class3 { }
        const decorator3 = function(target) { return Mixin(target, Class3); }

        @decorator2 class Model1 { }

        class Model2 extends Class1 { };
        class Model3 extends Class2 { };
        class Model4 extends Class3 { };

        expect(Model1.isMixedWith(Class1)).toBeTrue();
        expect(Model1.isMixedWith("Class1")).toBeTrue();
        expect(Model1.isMixedWith(Class2)).toBeTrue();
        expect(Model1.isMixedWith("Class2")).toBeTrue();
        expect(Model1.isMixedWith(Class3)).toBeFalse();
        expect(Model1.isMixedWith("Class3")).toBeFalse();

        // Model2 doesn't trigger Mixin, so the method will
        // be missing
        expect(Model2.isMixedWith).toBeUndefined();

        expect(Model3.isMixedWith(Class1)).toBeTrue();
        expect(Model3.isMixedWith("Class1")).toBeTrue();
        // the next two will be false because Model3 extends
        // Class2 which doesn't trigger mixin
        expect(Model3.isMixedWith(Class2)).toBeFalse();
        expect(Model3.isMixedWith("Class2")).toBeFalse();

        // these next two will be false just because
        expect(Model3.isMixedWith(Class3)).toBeFalse();
        expect(Model3.isMixedWith("Class3")).toBeFalse();

        // the following two are two because Model4 extends
        // Class3 which is decorated with Class2
        expect(Model4.isMixedWith(Class2)).toBeTrue();
        expect(Model4.isMixedWith("Class2")).toBeTrue();

        // these two will be false however because of the same
        // reason as before, the direct class extended does
        // not trigger Mixin; need to find a workout for this
        // as this is not intuitive.
        expect(Model4.isMixedWith(Class3)).toBeFalse();
        expect(Model4.isMixedWith("Class3")).toBeFalse();
    });
})
