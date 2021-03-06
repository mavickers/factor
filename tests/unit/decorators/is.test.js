import "jest-extended";
import { is } from "../../../src/base/classes/decorators";

describe("@is decorator tests (boolean)", () => {
    it("should apply decorator properly for primitives when instantiating", () => {
        let Class1;

        // check class definitions - type set to actual type or corresponding
        // string name, without initial values and with initial values, both
        // correct and incorrect types; repeat for each primitive type.
        expect(() => Class1 = class { @is(Boolean) field1; }).not.toThrow();
        expect(() => Class1 = class { @is(Boolean) field1 = "true"; }).toThrow();
        expect(() => Class1 = class { @is(Boolean) field1 = true; }).not.toThrow();
        expect(() => Class1 = class { @is("boolean") field1; }).not.toThrow();
        expect(() => Class1 = class { @is("boolean") field1 = "true"; }).toThrow();
        expect(() => Class1 = class { @is("boolean") field1 = true; }).not.toThrow();
        expect(() => Class1 = class { @is("Boolean") field1 = true; }).toThrow();

        expect(() => Class1 = class { @is(Number) field1; }).not.toThrow();
        expect(() => Class1 = class { @is(Number) field1 = 1; }).not.toThrow();
        expect(() => Class1 = class { @is(Number) field1 = "1"; }).toThrow();
        expect(() => Class1 = class { @is("number") field1; }).not.toThrow();
        expect(() => Class1 = class { @is("number") field1 = 1; }).not.toThrow();
        expect(() => Class1 = class { @is("number") field1 = "1"; }).toThrow();
        expect(() => Class1 = class { @is("Number") field1 = 1; }).toThrow();

        expect(() => Class1 = class { @is(String) field1; }).not.toThrow();
        expect(() => Class1 = class { @is(String) field1 = true; }).toThrow();
        expect(() => Class1 = class { @is(String) field1 = "true"; }).not.toThrow();
        expect(() => Class1 = class { @is("string") field1; }).not.toThrow();
        expect(() => Class1 = class { @is("string") field1 = true; }).toThrow();
        expect(() => Class1 = class { @is("string") field1 = "test"; }).not.toThrow();
        expect(() => Class1 = class { @is("String") field1 = "test"; }).toThrow();

        expect(() => Class1 = class { @is(Symbol) field1; }).not.toThrow();
        expect(() => Class1 = class { @is(Symbol) field1 = "Symbol"; }).toThrow();
        expect(() => Class1 = class { @is(Symbol) field1 = Symbol(); }).not.toThrow();
        expect(() => Class1 = class { @is("symbol") field1; }).not.toThrow();
        expect(() => Class1 = class { @is("symbol") field1 = "Symbol"; }).toThrow();
        expect(() => Class1 = class { @is("symbol") field1 = Symbol(); }).not.toThrow();
        expect(() => Class1 = class { @is("Symbol") field1 = Symbol(); }).toThrow();
    });

    it("should apply decorator properly for primitives after instantiation", () => {
        let Class1;
        let model1;

        // check setting values after instantiation; repeat for each primitive type.
        expect(() => Class1 = class { @is(Boolean) field1; @is("boolean") field2; }).not.toThrow();
        expect(() => model1 = new Class1()).not.toThrow();
        expect(() => model1.field1 = "false").toThrow();
        expect(() => model1.field2 = "false").toThrow();
        expect(model1.field1).toBeUndefined();
        expect(model1.field2).toBeUndefined();
        expect(() => { model1.field1 = false; model1.field2 = false; }).not.toThrow();
        expect(model1.field1).toBeFalse();
        expect(model1.field2).toBeFalse();

        expect(() => Class1 = class { @is(Number) field1; @is("number") field2; }).not.toThrow();
        expect(() => model1 = new Class1()).not.toThrow();
        expect(() => model1.field1 = "1").toThrow();
        expect(() => model1.field2 = "1").toThrow();
        expect(model1.field1).toBeUndefined();
        expect(model1.field2).toBeUndefined();
        expect(() => { model1.field1 = 1; model1.field2 = 47; }).not.toThrow();
        expect(model1.field1).toEqual(1);
        expect(model1.field2).toEqual(47);

        expect(() => Class1 = class { @is(String) field1; @is("string") field2; }).not.toThrow();
        expect(() => model1 = new Class1()).not.toThrow();
        expect(() => model1.field1 = false).toThrow();
        expect(() => model1.field2 = false).toThrow();
        expect(model1.field1).toBeUndefined();
        expect(model1.field2).toBeUndefined();
        expect(() => { model1.field1 = "false"; model1.field2 = "false"; }).not.toThrow();
        expect(model1.field1).toEqual("false");
        expect(model1.field2).toEqual("false");

        expect(() => Class1 = class { @is(Symbol) field1; @is("symbol") field2; }).not.toThrow();
        expect(() => model1 = new Class1()).not.toThrow();
        expect(() => model1.field1 = "symbol").toThrow();
        expect(() => model1.field2 = "symbol").toThrow();
        expect(model1.field1).toBeUndefined();
        expect(model1.field2).toBeUndefined();
        expect(() => { model1.field1 = Symbol.for("field1"); model1.field2 = Symbol.for("field2"); }).not.toThrow();
        expect(model1.field1).toEqual(Symbol.for("field1"));
        expect(model1.field2).toEqual(Symbol.for("field2"));
    });

    it("should apply decorator properly in non-standard cases", () => {
        let Class1;
        let model1;

        // check setting null/undefined properly without @required decorator;
        // should allow null/undefined to be set on the field without throwing.
        expect(() => Class1 = class { @is(Boolean) field1 = true; }).not.toThrow();
        expect(() => model1 = new Class1).not.toThrow();
        expect(() => model1.field1 = null).not.toThrow();
        expect(model1.field1).toBeNull();
        expect(() => model1.field1 = false).not.toThrow();
        expect(model1.field1).toBeFalse();
        expect(() => model1.field1 = undefined).not.toThrow();
        expect(model1.field1).toBeUndefined();

        // check for throw if trying to apply to anything not a class field.
        expect(() => @is(Boolean) class { }).toThrow();
    });

    it("should work independently when assigned to multiple fields", () => {
        let Class1, model1;

        expect(() => Class1 = class {
            @is(Boolean) field1 = true;
            @is(String) field2;
            @is("boolean") field3;
            @is("string") field4 = "testing!";
        }).not.toThrow();

        expect(() => model1 = new Class1()).not.toThrow();
        expect(model1.field1).toBeTrue();
        expect(model1.field2).toBeUndefined();
        expect(() => model1.field2 = "test").not.toThrow();
        expect(model1.field2).toEqual("test");
        expect(() => model1.field1 = "2").toThrow();
        expect(model1.field1).toBeTrue();
        expect(model1.field2).toEqual("test");

        expect(model1.field3).toBeUndefined();
        expect(model1.field4).toEqual("testing!");
        expect(() => model1.field3 = false).not.toThrow()
        expect(() => model1.field4 = "not testing").not.toThrow()
        expect(model1.field1).toBeTrue();
        expect(model1.field2).toEqual("test");
        expect(model1.field3).toBeFalse();
        expect(model1.field4).toEqual("not testing");
    });

    it("should handle special cases properly", () => {
       let Class1;

       expect(() => Class1 = @is(Boolean) class { @is(Boolean) field1 }).toThrow();
    });
})
