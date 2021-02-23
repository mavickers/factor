import "jest-extended";
import { required } from "../../src/base/classes/decorators";

describe("@required decorator tests", () => {
    it("should operate properly on fields when instantiating class", () => {
        let Class1;
        let Class2;
        let model1;

        expect(() => Class1 = class { @required field1; }).toThrow();
        expect(Class1).toBeUndefined();

        expect(() => Class2 = class { @required field1 = false; }).not.toThrow();
        expect(() => model1 = new Class2()).not.toThrow();
        expect(model1.field1).toBeFalse();
        expect(() => model1.field1 = true).not.toThrow();
        expect(model1.field1).toBeTrue();
    });

    it("should throw on null or undefined field assignment" , () => {
        let Class1, model1;

        expect(() => Class1 = class { @required field1 = true; }).not.toThrow();
        expect(() => model1 = new Class1()).not.toThrow();

        expect(() => model1.field1 = null).toThrow();
        expect(model1.field1).toBeTrue();
        expect(() => model1.field1 = undefined).toThrow();
        expect(model1.field1).toBeTrue();

        // @required should not care about changing types
        expect(() => model1.field1 = "hello").not.toThrow();
        expect(model1.field1).toEqual("hello");
    });

    it("should perform independently when there are multiple fields on a class", () => {
        let Class1, model1;

        expect(() => Class1 = class { @required field1 = false; field2; }).not.toThrow();
        expect(() => Class1 = class { @required field1; field2 = false; }).toThrow();
        expect(() => Class1 = class { @required field1 = true; field2; @required field3 = false; }).not.toThrow();
        expect(() => model1 = new Class1()).not.toThrow();
        expect(model1.field1).toBeTrue();
        expect(model1.field2).toBeUndefined();
        expect(model1.field3).toBeFalse();
    });
})
