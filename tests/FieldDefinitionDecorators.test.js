import "jest-extended";
import { is, readOnly, required } from "../src/base/classes/decorators";
import Utilities from "../src/base/Utilities";

describe("readOnly Field Definition", () => {
    it("should apply 'readOnly' decorator properly", () => {

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

    it("should apply 'required' decorator properly", () => {
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

    it("should apply 'is' decorator properly for primitives when instantiating", () => {
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

    it("should apply 'is' decorator properly for primitives after instantiation", () => {
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
        expect(() => { model1.field1 = 1; model1.field2 = 2; }).not.toThrow();
        expect(model1.field1).toEqual(1);
        expect(model1.field2).toEqual(2);

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

});
