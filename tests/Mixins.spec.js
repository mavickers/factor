import "jest-extended";
import { Configurable, Describable, Mappable } from "../src/base/interfaces";
import Classes from "../src/base/Classes.js";
import { describable, mappable } from "../src/base/classes/decorators";
import Mixin from "../src/base/classes/Mixin";
import Utilities from "../src/base/Utilities";

describe("Mixins", () => {
    it("should determine basic mixins", () => {
        @describable
        class Model1 { }
        @mappable @describable
        class Model2 { }
        class Model3 extends Describable { }
        class Model4 extends Classes(Describable, Mappable) { };

        expect(Utilities.hasInheritance(Model1, Describable)).toBeTrue();
        expect(Utilities.hasInheritance(Model1, "Describable")).toBeTrue();
        expect(Utilities.hasInheritance(Model2, Describable)).toBeTrue();
        expect(Utilities.hasInheritance(Model2, "Describable")).toBeTrue();
        expect(Utilities.hasInheritance(Model2, Mappable)).toBeTrue();
        expect(Utilities.hasInheritance(Model2, "Mappable")).toBeTrue();

        // Classes() calls Mixins and should add to the
        // target class' inheritance
        expect(Utilities.hasInheritance(Model4, Describable)).toBeTrue();
        expect(Utilities.hasInheritance(Model4, "Describable")).toBeTrue();

        expect(Utilities.hasInheritance(Model1, Configurable)).toBeFalse();
        expect(Utilities.hasInheritance(Model1, "Configurable")).toBeFalse();
        expect(Utilities.hasInheritance(Model4, Configurable)).toBeFalse();
        expect(Utilities.hasInheritance(Model4, "Configurable")).toBeFalse();
    });

    it("should determine complicated mixins", () => {
        const decorator1 = function(target) { return Mixin(target, Class1); }
        class Class1 { }

        @decorator1 class Class2 { }
        const decorator2 = function(target) { return Mixin(target, Class2); }

        @decorator2 class Class3 { }
        const decorator3 = function(target) { return Mixin(target, Class3); }

        @decorator2 class Model1 { }
        class Model2 extends Class1 { };
        class Model3 extends Class2 { };
        class Model4 extends Class3 { };

        expect(Utilities.hasInheritance(Model1, Class1)).toBeTrue();
        expect(Utilities.hasInheritance(Model1, "Class1")).toBeTrue();
        expect(Utilities.hasInheritance(Model1, Class2)).toBeTrue();
        expect(Utilities.hasInheritance(Model1, "Class2")).toBeTrue();
        expect(Utilities.hasInheritance(Model1, Class3)).toBeFalse();
        expect(Utilities.hasInheritance(Model1, "Class3")).toBeFalse();

        expect(Utilities.hasInheritance(Model2, Class1)).toBeTrue();
        expect(Utilities.hasInheritance(Model2, "Class1")).toBeTrue();
        expect(Utilities.hasInheritance(Model2, Class2)).toBeFalse();
        expect(Utilities.hasInheritance(Model2, "Class2")).toBeFalse();

        expect(Utilities.hasInheritance(Model3, Class1)).toBeTrue();
        expect(Utilities.hasInheritance(Model3, "Class1")).toBeTrue();
        expect(Utilities.hasInheritance(Model3, Class2)).toBeTrue();
        expect(Utilities.hasInheritance(Model3, "Class2")).toBeTrue();

        // these next two will be false just because
        expect(Utilities.hasInheritance(Model3, Class3)).toBeFalse();
        expect(Utilities.hasInheritance(Model3, "Class3")).toBeFalse();

        // the following two are true because Model4 extends
        // Class3 which is decorated with Class2
        expect(Utilities.hasInheritance(Model4, Class2)).toBeTrue();
        expect(Utilities.hasInheritance(Model4, "Class2")).toBeTrue();
    });
})
