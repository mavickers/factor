import "jest-extended";
import { is } from "../../../../src/base/classes/decorators";
import TypeMismatchSetOptions from "../../../../src/base/classes/flags/TypeMismatchSetOptions";
import onTypeMismatch, { mismatchConfig } from "../../../../src/base/classes/decorators/onTypeMismatch";

let Class1, Class2, Class3,
    model1, model2, model3,
    symbol1, symbol2, symbol3;

describe("@onTypeMismatch decorator noop option for boolean type tests", () => {
    beforeEach(() => {
        Class1 = Class2 = Class3 = undefined;
        model1 = model2 = model3 = undefined;
        symbol1 = Symbol(1);
        symbol2 = Symbol(2);
        symbol3 = Symbol(3);
    });

    describe("when set on classes", () => {
        beforeEach(() => {

            Class1 = @onTypeMismatch("Noop") class {
                @is(Symbol) field1;
                @is("symbol") field2;
                @is(Symbol) field3 = symbol1;
                @is("symbol") field4 = symbol2;
            }

            Class2 = @onTypeMismatch(TypeMismatchSetOptions.Noop) class {
                @is(Symbol) field1;
                @is("symbol") field2;
                @is(Symbol) field3 = symbol1;
                @is("symbol") field4 = symbol2;
            }

            expect(() => model1 = new Class1()).not.toThrow();
            expect(() => model2 = new Class2()).not.toThrow();
        });

        // testing onTypeMismatch on class level will not work at this time
        // because field decorators fire before class decorators.
        it.skip("should set values to null when class is defined with type mismatches", () => {
            expect(() => @onTypeMismatch("Noop") class { @is(Symbol) field1 = "true" }).not.toThrow();
            expect(() => @onTypeMismatch(TypeMismatchSetOptions.Noop) class { @is(Symbol) field1 = "false" }).not.toThrow();
        });

        it("should have initial values set properly", () => {
            expect(Class1[onTypeMismatch[mismatchConfig]] === TypeMismatchSetOptions.Noop);

            expect(model1.field1).toBeUndefined();
            expect(model1.field2).toBeUndefined();
            expect(model1.field3).toEqual(symbol1);
            expect(model1.field4).toEqual(symbol2);
        });

        it("should leave field values as-is when fields are not set after instantiation according to type", () => {
            expect(() => model1.field1 = "true").not.toThrow();
            expect(() => model1.field2 = "false").not.toThrow();
            expect(model1.field1).toBeUndefined()
            expect(model1.field2).toBeUndefined();
            expect(() => model2.field1 = "true").not.toThrow();
            expect(() => model2.field2 = "false").not.toThrow();
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
                @is(Symbol) @onTypeMismatch("Noop") field1;
                @is("symbol") @onTypeMismatch("Noop") field2;
                @is(Symbol) field3;
                @is("symbol") field4;
                @is(Symbol) @onTypeMismatch(TypeMismatchSetOptions.Noop) field5;
                @is("symbol") @onTypeMismatch(TypeMismatchSetOptions.Noop) field6;
                @is(Symbol) @onTypeMismatch("Noop") field7 = symbol1;
                @is("symbol") @onTypeMismatch("Noop") field8 = symbol2;
                @is(Symbol) @onTypeMismatch(TypeMismatchSetOptions.Noop) field9 = symbol1;
                @is("symbol") @onTypeMismatch(TypeMismatchSetOptions.Noop) field10 = symbol2;
            }

            Class2 = @onTypeMismatch("Noop") class {
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

        it("should not throw when fields are not set at instantiation according to type", () => {
            let Class4, model4;
            expect(() => Class4 = class { @is(Symbol) @onTypeMismatch("Noop") field1 = "true" }).not.toThrow();
            expect(Class4).not.toBeUndefined();
            expect(() => model4 = new Class4()).not.toThrow();
            expect(model4.field1).toBeUndefined();
            expect(() => Class4 = class { @is("symbol") @onTypeMismatch("Noop") field1 = "true" }).not.toThrow();
            expect(Class4).not.toBeUndefined();
            expect(() => model4 = new Class4()).not.toThrow();
            expect(model4.field1).toBeUndefined();
            expect(() => Class4 = class { @is(Symbol) @onTypeMismatch(TypeMismatchSetOptions.Noop) field1 = "true" }).not.toThrow();
            expect(Class4).not.toBeUndefined();
            expect(() => model4 = new Class4()).not.toThrow();
            expect(model4.field1).toBeUndefined();
            expect(() => Class4 = class { @is("symbol") @onTypeMismatch(TypeMismatchSetOptions.Noop) field1 = "true" }).not.toThrow();
            expect(Class4).not.toBeUndefined();
            expect(() => model4 = new Class4()).not.toThrow();
            expect(model4.field1).toBeUndefined();
        });

        it("should leave field values as-is when fields are not set after instantiation according to type", () => {
            expect(() => model1.field1 = "true").not.toThrow();
            expect(() => model1.field2 = "false").not.toThrow();
            expect(model1.field1).toBeUndefined();
            expect(model1.field2).toBeUndefined();
            expect(() => model1.field5 = "true").not.toThrow();
            expect(() => model1.field6 = "false").not.toThrow();
            expect(model1.field5).toBeUndefined();
            expect(model1.field6).toBeUndefined();
            expect(() => model1.field7 = "true").not.toThrow();
            expect(() => model1.field8 = "false").not.toThrow();
            expect(model1.field7).toEqual(symbol1);
            expect(model1.field8).toEqual(symbol2);
            expect(() => model1.field9 = "true").not.toThrow();
            expect(() => model1.field10 = "false").not.toThrow();
            expect(model1.field9).toEqual(symbol1);
            expect(model1.field10).toEqual(symbol2);

            // this tests default type mismatch (which should be "Throw")
            expect(() => model1.field3 = "true").toThrow();
            expect(() => model1.field4 = "false").toThrow();
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
                    @is(Symbol) @onTypeMismatch("Noop") field1;
                    @is("symbol") @onTypeMismatch("Noop") field2;
                    @is(Symbol) @onTypeMismatch(TypeMismatchSetOptions.Noop) field3;
                    @is("symbol") @onTypeMismatch(TypeMismatchSetOptions.Noop) field4;
                    @is(Symbol) @onTypeMismatch("Noop") field5 = symbol1;
                    @is(Symbol) @onTypeMismatch("Noop") field6 = "true";
                };

                model3 = new Class3();
            }).not.toThrow();

            expect(Class3[mismatchConfig].equals("Ignore"));
            expect(() => model3.fieldA = "testA").not.toThrow();
            expect(() => model3.fieldB = "testB").not.toThrow();
            expect(model3.fieldA).toEqual("testA");
            expect(model3.fieldB).toEqual("testB");
            // expect(model3.fieldC).toEqual("testC");
            // expect(model3.fieldD).toEqual("testD");
            expect(() => model3.field1 = "test1").not.toThrow();
            expect(() => model3.field2 = "test2").not.toThrow();
            expect(() => model3.field3 = "test3").not.toThrow();
            expect(() => model3.field4 = "test4").not.toThrow();
            expect(model3.field1).toBeUndefined();
            expect(model3.field2).toBeUndefined();
            expect(model3.field3).toBeUndefined();
            expect(model3.field4).toBeUndefined();
            expect(model3.field5).toEqual(symbol1);
            expect(model3.field6).toBeUndefined();
        });
    });
});
