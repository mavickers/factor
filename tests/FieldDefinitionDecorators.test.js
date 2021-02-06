import "jest-extended";
import { readOnly, required } from "../src/base/classes/decorators";

describe("readOnly Field Definition", () => {
    it("should apply 'readOnly' property properly", () => {

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

        // if @readOnly is applied to a class (or anything other than a
        // field) then it should throw when invoked.

        let Class2;

        expect(() => Class2 = @readOnly class { field1 = false }).toThrow();
        expect(Class2).toBeUndefined();
    });

    it("should apply 'required' property properly", () => {
        let Class1;
        let Class2;
        let model1;

        // if @required is invoked on a field that does not set a value at
        // class definition it should throw.
        expect(() => Class1 = class { @required field1; }).toThrow();
        expect(Class1).toBeUndefined();

        expect(() => Class2 = class { @required field1 = false; }).not.toThrow();
        expect(() => model1 = new Class2()).not.toThrow();
        expect(model1.field1).toBeFalse();
        expect(() => model1.field1 = true).not.toThrow();
        expect(model1.field1).toBeTrue();

        // @required should cause a field assignment to null or
        // undefined to throw
        expect(() => model1.field1 = null).toThrow();
        expect(model1.field1).toBeTrue();
        expect(() => model1.field1 = undefined).toThrow();
        expect(model1.field1).toBeTrue();
        expect(() => model1.field1 = "hello").not.toThrow();
        expect(model1.field1).toEqual("hello");
    });
});
