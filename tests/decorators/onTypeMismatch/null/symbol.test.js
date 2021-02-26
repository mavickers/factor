import "jest-extended";
import { is } from "../../../../src/base/classes/decorators";
import TypeMismatchSetOptions from "../../../../src/base/classes/flags/TypeMismatchSetOptions";
import onTypeMismatch, { mismatchConfig } from "../../../../src/base/classes/decorators/onTypeMismatch";

let Class1, Class2, Class3,
    model1, model2, model3,
    symbol1, symbol2, symbol3;

describe("@onTypeMismatch decorator null option for symbol type tests", () => {
    beforeEach(() => {
        Class1 = Class2 = Class3 = undefined;
        model1 = model2 = model3 = undefined;
        symbol1 = Symbol(1);
        symbol2 = Symbol(2);
        symbol3 = Symbol(3);
    });

    describe("when set on classes", () => {
        beforeEach(() => {

            Class1 = @onTypeMismatch("Null") class {
                @is(Symbol) field1;
                @is("symbol") field2;
                @is(Symbol) field3 = "1";
                @is("symbol") field4 = "100.1";
            }

            Class2 = @onTypeMismatch(TypeMismatchSetOptions.Null) class {
                @is(Symbol) field1;
                @is("symbol") field2;
                @is(Symbol) field3 = "1";
                @is("symbol") field4 = "100.1";
            }

            expect(() => model1 = new Class1()).not.toThrow();
            expect(() => model2 = new Class2()).not.toThrow();
        });

        // testing onTypeMismatch on class level will not work at this time
        // because field decorators fire before class decorators.
        it.skip("should set values to null when class is defined with type mismatches", () => {
            expect(() => @onTypeMismatch("Null") class { @is(Symbol) field1 = "true" }).not.toThrow();
            expect(() => @onTypeMismatch(TypeMismatchSetOptions.Null) class { @is(Symbol) field1 = "false" }).not.toThrow();
        });

        it("should have initial values set properly", () => {
            expect(Class1[onTypeMismatch[mismatchConfig]] === TypeMismatchSetOptions.Null);

            expect(model1.field1).toBeUndefined();
            expect(model1.field2).toBeUndefined();
            expect(model1.field3).toEqual("1");
            expect(model1.field4).toEqual("100.1");
        });

        it("should set field values to null when fields are not set after instantiation according to type", () => {
            expect(() => model1.field1 = 1).not.toThrow();
            expect(() => model1.field2 = 100.1).not.toThrow();
            expect(model1.field1).toBeNull();
            expect(model1.field2).toBeNull();
            expect(() => model2.field1 = 1).not.toThrow();
            expect(() => model2.field2 = 100.1).not.toThrow();
            expect(model2.field1).toBeNull();
            expect(model2.field2).toBeNull();
        });

        it("should allow fields to set to their proper values", () => {
            expect(() => model1.field1 = "1").not.toThrow();
            expect(model1.field1).toEqual("1");
            expect(() => model1.field2 = "100.1").not.toThrow();
            expect(model1.field2).toEqual("100.1");
            expect(() => model2.field1 = "1").not.toThrow();
            expect(model1.field1).toEqual("1");
            expect(() => model2.field2 = "100.1").not.toThrow();
            expect(model1.field2).toEqual("100.1");
        });
    });

    describe("when set on fields", () => {
        beforeEach(() => {
            Class1 = class {
                @is(Symbol) @onTypeMismatch("Null") field1;
                @is("symbol") @onTypeMismatch("Null") field2;
                @is(Symbol) field3;
                @is("symbol") field4;
                @is(Symbol) @onTypeMismatch(TypeMismatchSetOptions.Null) field5;
                @is("symbol") @onTypeMismatch(TypeMismatchSetOptions.Null) field6;
                @is(Symbol) @onTypeMismatch("Null") field7 = "1";
                @is("symbol") @onTypeMismatch("Null") field8 = "100.1";
                @is(Symbol) @onTypeMismatch(TypeMismatchSetOptions.Null) field9 = "1";
                @is("symbol") @onTypeMismatch(TypeMismatchSetOptions.Null) field10 = "100.1";
            }

            Class2 = @onTypeMismatch("Null") class {
                @is(Symbol) field1;
                field2;
            }

            expect(() => model1 = new Class1()).not.toThrow();
        });

        it("should have initial values set properly", () => {
            expect(model1.field1).toBeUndefined();
            expect(model1.field2).toBeUndefined();
            expect(model1.field3).toBeUndefined();
            expect(model1.field4).toBeUndefined();
            expect(model1.field5).toBeUndefined();
            expect(model1.field6).toBeUndefined();
            expect(model1.field7).toEqual("1");
            expect(model1.field8).toEqual("100.1");
            expect(model1.field9).toEqual("1");
            expect(model1.field10).toEqual("100.1");
        });

        it("should not throw when fields are not set at instantiation according to type", () => {
            let Class4, model4;
            expect(() => Class4 = class { @is(Symbol) @onTypeMismatch("Null") field1 = true }).not.toThrow();
            expect(Class4).not.toBeUndefined();
            expect(() => model4 = new Class4()).not.toThrow();
            expect(model4.field1).toBeNull();
            expect(() => Class4 = class { @is("symbol") @onTypeMismatch("Null") field1 = true }).not.toThrow();
            expect(Class4).not.toBeUndefined();
            expect(() => model4 = new Class4()).not.toThrow();
            expect(model4.field1).toBeNull();
            expect(() => Class4 = class { @is(Symbol) @onTypeMismatch(TypeMismatchSetOptions.Null) field1 = true }).not.toThrow();
            expect(Class4).not.toBeUndefined();
            expect(() => model4 = new Class4()).not.toThrow();
            expect(model4.field1).toBeNull();
            expect(() => Class4 = class { @is("symbol") @onTypeMismatch(TypeMismatchSetOptions.Null) field1 = true }).not.toThrow();
            expect(Class4).not.toBeUndefined();
            expect(() => model4 = new Class4()).not.toThrow();
            expect(model4.field1).toBeNull();
        });

        it("should set field values to null when fields are not set after instantiation according to type", () => {
            expect(() => model1.field1 = 1).not.toThrow();
            expect(() => model1.field2 = 100.1).not.toThrow();
            expect(model1.field1).toBeNull();
            expect(model1.field2).toBeNull();
            expect(() => model1.field5 = 1).not.toThrow();
            expect(() => model1.field6 = 100.1).not.toThrow();
            expect(model1.field5).toBeNull();
            expect(model1.field6).toBeNull();
            expect(() => model1.field7 = 1).not.toThrow();
            expect(() => model1.field8 = 100.1).not.toThrow();
            expect(model1.field7).toBeNull();
            expect(model1.field8).toBeNull();
            expect(() => model1.field9 = 1).not.toThrow();
            expect(() => model1.field10 = 100.1).not.toThrow();
            expect(model1.field9).toBeNull();
            expect(model1.field10).toBeNull();

            // this tests default type mismatch (which should be "Throw")
            expect(() => model1.field3 = 1).toThrow();
            expect(() => model1.field4 = 100.1).toThrow();
            expect(model1.field3).toBeUndefined();
            expect(model1.field4).toBeUndefined();
        });

        it("should allow fields to set to their proper values", () => {
            expect(() => model1.field1 = "1").not.toThrow();
            expect(model1.field1).toEqual("1");
            expect(() => model1.field2 = "100.1").not.toThrow();
            expect(model1.field2).toEqual("100.1");
            expect(() => model1.field5 = "1").not.toThrow();
            expect(model1.field5).toEqual("1");
            expect(() => model1.field6 = "100.1").not.toThrow();
            expect(model1.field6).toEqual("100.1");

            // this tests that default type mismatch does not interfere
            // when values are set properly
            expect(() => model1.field3 = "1").not.toThrow();
            expect(() => model1.field4 = "100.1").not.toThrow();
            expect(model1.field3).toEqual("1");
            expect(model1.field4).toEqual("100.1");
        });

        it("should override class option when set on field", () => {
            expect(() => {
                Class3 =  @onTypeMismatch("Ignore") class {
                    @is(Symbol) fieldA;
                    @is("symbol") fieldB;
                    // this use-case is broken for the time being
                    // @is(Symbol) fieldC = "testC";
                    // @is("symbol") fieldD = "testD";
                    @is(Symbol) @onTypeMismatch("Null") field1;
                    @is("symbol") @onTypeMismatch("Null") field2;
                    @is(Symbol) @onTypeMismatch(TypeMismatchSetOptions.Null) field3;
                    @is("symbol") @onTypeMismatch(TypeMismatchSetOptions.Null) field4;
                    @is(Symbol) @onTypeMismatch("Null") field5 = "1";
                    @is(Symbol) @onTypeMismatch("Null") field6 = 1;
                };

                model3 = new Class3();
            }).not.toThrow();

            expect(Class3[mismatchConfig].equals("Ignore"));
            expect(() => model3.fieldA = 1).not.toThrow();
            expect(() => model3.fieldB = 100.1).not.toThrow();
            expect(model3.fieldA).toEqual(1);
            expect(model3.fieldB).toEqual(100.1);
            // expect(model3.fieldC).toEqual("testC");
            // expect(model3.fieldD).toEqual("testD");
            expect(() => model3.field1 = 1).not.toThrow();
            expect(() => model3.field2 = 100.1).not.toThrow();
            expect(() => model3.field3 = -1).not.toThrow();
            expect(() => model3.field4 = -100.1).not.toThrow();
            expect(model3.field1).toBeNull();
            expect(model3.field2).toBeNull();
            expect(model3.field3).toBeNull();
            expect(model3.field4).toBeNull();
            expect(model3.field5).toEqual("1");
            expect(model3.field6).toBeNull();
        });
    });
});
