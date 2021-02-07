import "jest-extended";
import { required } from "../src/base/classes/decorators";

describe("@required decorator tests", () => {
    it("should apply decorator properly", () => {
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
})
