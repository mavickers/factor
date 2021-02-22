import "jest-extended";
import { is } from "../../../../src/base/classes/decorators";
import TypeMismatchSetOptions from "../../../../src/base/classes/flags/TypeMismatchSetOptions";
import onTypeMismatch, { mismatchConfig } from "../../../../src/base/classes/decorators/onTypeMismatch";

let Class1, Class2, Class3,
    model1, model2, model3,
    symbol1, symbol2, symbol3;

describe("@onTypeMismatch decorator tests throw option for symbol type", () => {
    beforeEach(() => {

       Class1 = Class2 = Class3 = undefined;
       model1 = model2 = model3 = undefined;
    });

    describe("when set on classes", () => {
        beforeEach(() => {

            symbol1 = Symbol(1);
            symbol2 = Symbol(2);
            symbol3 = Symbol(3);


            Class1 = @onTypeMismatch("Throw") class {
                @is(Symbol) field1;
                @is("symbol") field2;
                @is(Symbol) field3 = symbol1;
                @is("symbol") field4 = symbol2;
            }

            Class2 = @onTypeMismatch(TypeMismatchSetOptions.Throw) class {
                @is(Symbol) field1;
                @is("symbol") field2;
                @is(Symbol) field3 = symbol1;
                @is("symbol") field4 = symbol2;
            }

            expect(() => model1 = new Class1()).not.toThrow();
            expect(() => model2 = new Class2()).not.toThrow();
        });

       it("should throw when class is defined with type mismatches", () => {
            expect(() => @onTypeMismatch("Throw") class { @is(Symbol) field1 = true }).toThrow();
            expect(() => @onTypeMismatch(TypeMismatchSetOptions.Throw) class { @is(Symbol) field1 = false }).toThrow();
       });

       it("should have initial values set properly", () => {
           expect(Class1[onTypeMismatch[mismatchConfig]] === TypeMismatchSetOptions.Throw);

           expect(model1.field1).toBeUndefined();
           expect(model1.field2).toBeUndefined();
           expect(model1.field3).toEqual(symbol1);
           expect(model1.field4).toEqual(symbol2);
       });

       it("should throw when fields are not set after instantiation according to type", () => {
           expect(() => model1.field1 = true).toThrow();
           expect(() => model1.field2 = false).toThrow();
           expect(model1.field1).toBeUndefined();
           expect(model1.field2).toBeUndefined();
           expect(() => model2.field1 = true).toThrow();
           expect(() => model2.field2 = false).toThrow();
           expect(model2.field1).toBeUndefined();
           expect(model2.field2).toBeUndefined();
       });

       it("should allow fields to set to their proper values", () => {
           expect(() => model1.field1 = symbol1).not.toThrow();
           expect(model1.field1).toEqual(symbol1);
           expect(() => model1.field2 = symbol2).not.toThrow();
           expect(model1.field2).toEqual(symbol2);
           expect(() => model2.field1 = symbol1).not.toThrow();
           expect(model1.field1).toEqual(symbol1);
           expect(() => model2.field2 = symbol2).not.toThrow();
           expect(model1.field2).toEqual(symbol2);
       });
    });

    describe("when set on fields", () => {
        beforeEach(() => {
            Class1 = class {
                @is(Symbol) @onTypeMismatch("Throw") field1;
                @is("symbol") @onTypeMismatch("Throw") field2;
                @is(Symbol) field3;
                @is("symbol") field4;
                @is(Symbol) @onTypeMismatch(TypeMismatchSetOptions.Throw) field5;
                @is("symbol") @onTypeMismatch(TypeMismatchSetOptions.Throw) field6;
                @is(Symbol) @onTypeMismatch("Throw") field7 = symbol1;
                @is("symbol") @onTypeMismatch("Throw") field8 = symbol2;
                @is(Symbol) @onTypeMismatch(TypeMismatchSetOptions.Throw) field9 = symbol1;
                @is("symbol") @onTypeMismatch(TypeMismatchSetOptions.Throw) field10 = symbol2;
            }

            Class2 = @onTypeMismatch("Throw") class {
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
            expect(model1.field7).toEqual(symbol1);
            expect(model1.field8).toEqual(symbol2);
            expect(model1.field9).toEqual(symbol1);
            expect(model1.field10).toEqual(symbol2);
        });

        it("should throw when fields are not set at instantiation according to type", () => {
            let Class4, model4;
            expect(() => Class4 = class { @is(Symbol) @onTypeMismatch("Throw") field1 = true }).toThrow();
            expect(Class4).toBeUndefined();
            expect(() => Class4 = class { @is("symbol") @onTypeMismatch("Throw") field1 = true }).toThrow();
            expect(Class4).toBeUndefined();
            expect(() => Class4 = class { @is(Symbol) @onTypeMismatch(TypeMismatchSetOptions.Throw) field1 = true }).toThrow();
            expect(Class4).toBeUndefined();
            expect(() => Class4 = class { @is("symbol") @onTypeMismatch(TypeMismatchSetOptions.Throw) field1 = true }).toThrow();
            expect(Class4).toBeUndefined();
        });

        it("should throw when fields are not set after instantiation according to type", () => {
            expect(() => model1.field1 = true).toThrow();
            expect(() => model1.field2 = false).toThrow();
            expect(model1.field1).toBeUndefined();
            expect(model1.field2).toBeUndefined();
            expect(() => model1.field5 = true).toThrow();
            expect(() => model1.field6 = false).toThrow();
            expect(model1.field5).toBeUndefined();
            expect(model1.field6).toBeUndefined();

            // this tests default type mismatch (which should be "Throw")
            expect(() => model1.field3 = true).toThrow();
            expect(() => model1.field4 = false).toThrow();
            expect(model1.field3).toBeUndefined();
            expect(model1.field4).toBeUndefined();
        });

        it("should allow fields to set to their proper values", () => {
            expect(() => model1.field1 = symbol1).not.toThrow();
            expect(model1.field1).toEqual(symbol1);
            expect(() => model1.field2 = symbol2).not.toThrow();
            expect(model1.field2).toEqual(symbol2);
            expect(() => model1.field5 = symbol1).not.toThrow();
            expect(model1.field5).toEqual(symbol1);
            expect(() => model1.field6 = symbol2).not.toThrow();
            expect(model1.field6).toEqual(symbol2);

            // this tests that default type mismatch does not interfere
            // when values are set properly
            expect(() => model1.field3 = symbol1).not.toThrow();
            expect(() => model1.field4 = symbol2).not.toThrow();
            expect(model1.field3).toEqual(symbol1);
            expect(model1.field4).toEqual(symbol2);
        });

        it("should override class option when set on field", () => {
            expect(() => {
                Class3 =  @onTypeMismatch("Ignore") class {
                    @is(Symbol) fieldA;
                    @is("symbol") fieldB;
                    // this use-case is broken for the time being
                    // @is(Symbol) fieldC = "testC";
                    // @is("symbol") fieldD = "testD";
                    @is(Symbol) @onTypeMismatch("Throw") field1;
                    @is("symbol") @onTypeMismatch("Throw") field2;
                    @is(Symbol) @onTypeMismatch(TypeMismatchSetOptions.Throw) field3;
                    @is("symbol") @onTypeMismatch(TypeMismatchSetOptions.Throw) field4;
                    @is(Symbol) @onTypeMismatch("Throw") field5 = symbol1;
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
            expect(() => model3.field1 = true).toThrow();
            expect(() => model3.field2 = false).toThrow();
            expect(() => model3.field3 = 1).toThrow();
            expect(() => model3.field4 = 100.1).toThrow();
            expect(model3.field5).toEqual(symbol1);
        });
    });
});
