import "jest-extended";
import { is } from "../../../../../src/base/classes/decorators";
import TypeMismatchSetOptions from "../../../../../src/base/classes/flags/TypeMismatchSetOptions";
import onTypeMismatch, { mismatchConfig } from "../../../../../src/base/classes/decorators/onTypeMismatch";

let Class1, Class2, Class3,
    model1, model2, model3;

describe("@onTypeMismatch decorator noop option for boolean type tests", () => {
    beforeEach(() => {
        Class1 = Class2 = Class3 = undefined;
        model1 = model2 = model3 = undefined;
    });

    describe("when set on classes", () => {
        beforeEach(() => {

            Class1 = @onTypeMismatch("Noop") class {
                @is(Boolean) field1;
                @is("boolean") field2;
                @is(Boolean) field3 = true;
                @is("boolean") field4 = false;
            }

            Class2 = @onTypeMismatch(TypeMismatchSetOptions.Noop) class {
                @is(Boolean) field1;
                @is("boolean") field2;
                @is(Boolean) field3 = true;
                @is("boolean") field4 = false;
            }

            expect(() => model1 = new Class1()).not.toThrow();
            expect(() => model2 = new Class2()).not.toThrow();
        });

        // testing onTypeMismatch on class level will not work at this time
        // because field decorators fire before class decorators.
        it.skip("should set values to null when class is defined with type mismatches", () => {
            expect(() => @onTypeMismatch("Noop") class { @is(Boolean) field1 = "true" }).not.toThrow();
            expect(() => @onTypeMismatch(TypeMismatchSetOptions.Noop) class { @is(Boolean) field1 = "false" }).not.toThrow();
        });

        it("should have initial values set properly", () => {
            expect(Class1[onTypeMismatch[mismatchConfig]] === TypeMismatchSetOptions.Noop);

            expect(model1.field1).toBeUndefined();
            expect(model1.field2).toBeUndefined();
            expect(model1.field3).toBeTrue();
            expect(model1.field4).toBeFalse();
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
            expect(() => model1.field1 = true).not.toThrow();
            expect(model1.field1).toBeTrue();
            expect(() => model1.field2 = false).not.toThrow();
            expect(model1.field2).toBeFalse();
            expect(() => model2.field1 = true).not.toThrow();
            expect(model1.field1).toBeTrue();
            expect(() => model2.field2 = false).not.toThrow();
            expect(model1.field2).toBeFalse();
        });
    });

    describe("when set on fields", () => {
        beforeEach(() => {
            Class1 = class {
                @is(Boolean) @onTypeMismatch("Noop") field1;
                @is("boolean") @onTypeMismatch("Noop") field2;
                @is(Boolean) field3;
                @is("boolean") field4;
                @is(Boolean) @onTypeMismatch(TypeMismatchSetOptions.Noop) field5;
                @is("boolean") @onTypeMismatch(TypeMismatchSetOptions.Noop) field6;
                @is(Boolean) @onTypeMismatch("Noop") field7 = true;
                @is("boolean") @onTypeMismatch("Noop") field8 = false;
                @is(Boolean) @onTypeMismatch(TypeMismatchSetOptions.Noop) field9 = true;
                @is("boolean") @onTypeMismatch(TypeMismatchSetOptions.Noop) field10 = false;
            }

            Class2 = @onTypeMismatch("Noop") class {
                @is(Boolean) field1;
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
            expect(model1.field7).toBeTrue();
            expect(model1.field8).toBeFalse();
            expect(model1.field9).toBeTrue();
            expect(model1.field10).toBeFalse();
        });

        it("should not throw when fields are not set at instantiation according to type", () => {
            let Class4, model4;
            expect(() => Class4 = class { @is(Boolean) @onTypeMismatch("Noop") field1 = "true" }).not.toThrow();
            expect(Class4).not.toBeUndefined();
            expect(() => model4 = new Class4()).not.toThrow();
            expect(model4.field1).toBeUndefined();
            expect(() => Class4 = class { @is("boolean") @onTypeMismatch("Noop") field1 = "true" }).not.toThrow();
            expect(Class4).not.toBeUndefined();
            expect(() => model4 = new Class4()).not.toThrow();
            expect(model4.field1).toBeUndefined();
            expect(() => Class4 = class { @is(Boolean) @onTypeMismatch(TypeMismatchSetOptions.Noop) field1 = "true" }).not.toThrow();
            expect(Class4).not.toBeUndefined();
            expect(() => model4 = new Class4()).not.toThrow();
            expect(model4.field1).toBeUndefined();
            expect(() => Class4 = class { @is("boolean") @onTypeMismatch(TypeMismatchSetOptions.Noop) field1 = "true" }).not.toThrow();
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
            expect(model1.field7).toBeTrue();
            expect(model1.field8).toBeFalse();
            expect(() => model1.field9 = "true").not.toThrow();
            expect(() => model1.field10 = "false").not.toThrow();
            expect(model1.field9).toBeTrue();
            expect(model1.field10).toBeFalse();

            // this tests default type mismatch (which should be "Throw")
            expect(() => model1.field3 = "true").toThrow();
            expect(() => model1.field4 = "false").toThrow();
            expect(model1.field3).toBeUndefined();
            expect(model1.field4).toBeUndefined();
        });

        it("should allow fields to set to their proper values", () => {
            expect(() => model1.field1 = true).not.toThrow();
            expect(model1.field1).toBeTrue();
            expect(() => model1.field2 = false).not.toThrow();
            expect(model1.field2).toBeFalse();
            expect(() => model1.field5 = true).not.toThrow();
            expect(model1.field5).toBeTrue();
            expect(() => model1.field6 = false).not.toThrow();
            expect(model1.field6).toBeFalse();

            // this tests that default type mismatch does not interfere
            // when values are set properly
            expect(() => model1.field3 = true).not.toThrow();
            expect(() => model1.field4 = false).not.toThrow();
            expect(model1.field3).toBeTrue();
            expect(model1.field4).toBeFalse();
        });

        it("should override class option when set on field", () => {
            expect(() => {
                Class3 =  @onTypeMismatch("Ignore") class {
                    @is(Boolean) fieldA;
                    @is("boolean") fieldB;
                    // this use-case is broken for the time being
                    // @is(Boolean) fieldC = "testC";
                    // @is("boolean") fieldD = "testD";
                    @is(Boolean) @onTypeMismatch("Noop") field1;
                    @is("boolean") @onTypeMismatch("Noop") field2;
                    @is(Boolean) @onTypeMismatch(TypeMismatchSetOptions.Noop) field3;
                    @is("boolean") @onTypeMismatch(TypeMismatchSetOptions.Noop) field4;
                    @is(Boolean) @onTypeMismatch("Noop") field5 = true;
                    @is(Boolean) @onTypeMismatch("Noop") field6 = "true";
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
            expect(model3.field5).toEqual(true);
            expect(model3.field6).toBeUndefined();
        });
    });
});
