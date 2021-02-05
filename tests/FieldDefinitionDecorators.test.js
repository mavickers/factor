import "jest-extended";
import { readOnly } from "../src/base/classes/decorators";

describe("readOnly Field Definition", () => {
    it("should apply readOnly property properly", () => {

        // readOnly should deny the ability to set a value on a
        // field; should throw when trying to assign.

        class Class1 {
            @readOnly field1 = false;
        };

        let model1;

        expect(() => model1 = new Class1()).not.toThrow();
        expect(model1.field1).toBeFalse();
        expect(() => model1.field1 = true).toThrow();
        expect(model1.field1).toBeFalse();

        // readOnly should have no affect when applied to a class;
        // that values of fields within the class should be
        // assignable without restriction.

        @readOnly
        class Class2 {
            field1 = false;
        };

        expect(() => model1 = new Class2()).not.toThrow();
        expect(model1.field1).toBeFalse();
        expect(() => model1.field1 = true).not.toThrow();
        expect(model1.field1).toBeTrue();
    });
});
