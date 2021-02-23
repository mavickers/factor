import "jest-extended";
import { readOnly } from "../../src/base/classes/decorators";

describe("@readOnly decorator tests", () => {
    it("should apply 'readOnly' decorator properly", () => {

        // readOnly should deny the ability to set a value on a
        // field; should throw when trying to assign.

        class Class1 { @readOnly field1 = false; };

        let model1;

        expect(() => model1 = new Class1()).not.toThrow();
        expect(model1.field1).toBeFalse();
        expect(() => model1.field1 = true).toThrow();
        expect(model1.field1).toBeFalse();

        // if @readOnly is applied to a class (or anything other than a
        // field) then it should throw when invoked.

        let Class2;

        expect(() => Class2 = @readOnly class { field1 = false }).toThrow();
        expect(Class2).toBeUndefined();
    });
});
