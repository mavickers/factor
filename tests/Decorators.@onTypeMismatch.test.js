import "jest-extended";
import { is } from "../src/base/classes/decorators";
import TypeMismatchSetOptions from "../src/base/classes/flags/TypeMismatchSetOptions";
import onTypeMismatch from "../src/base/classes/decorators/onTypeMismatch";

describe("@onTypeMismatch decorator tests", () => {
    it("should execute noop option properly", () => {

    });

    it("should execute ignore option properly", () => {

    });

    it("should execute throw option properly", () => {
        class Class1 {
            @is(Boolean) @onTypeMismatch("Throw") field1;
            field2;
        }

        // @onTypeMismatch("Throw")
        // class Class2 {
        //     @is(Boolean) field1;
        //     field2;
        // }

        let model1;

        // should not throw because @required is not set
        expect(() => model1 = new Class1()).not.toThrow();
        expect(model1.field1).toBeUndefined();
        expect(() => model1.field1 = "true").toThrow();
        expect(model1.field1).toBeUndefined();
        expect(() => model1.field1 = true).not.toThrow();
        expect(model1.field1).toBeTrue();
        expect(() => model1.field1 = false).not.toThrow();
        expect(model1.field1).toBeFalse();
        expect(() => model1.field2 = "test").not.toThrow();
    });

    it("should execute null option properly", () => {

    });
})
