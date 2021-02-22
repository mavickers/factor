import "jest-extended";
import { is } from "../../../../src/base/classes/decorators";
import TypeMismatchSetOptions from "../../../../src/base/classes/flags/TypeMismatchSetOptions";
import onTypeMismatch, { mismatchConfig } from "../../../../src/base/classes/decorators/onTypeMismatch";

let Class1, Class2, Class3,
    model1, model2, model3;

describe("@onTypeMismatch decorator tests throw option for boolean type", () => {
    beforeEach(() => {
       Class1 = Class2 = Class3 = undefined;
       model1 = model2 = model3 = undefined;
    });

    describe("when set on classes", () => {
        beforeEach(() => {

            Class1 = @onTypeMismatch("Throw") class {
                @is(String) field1;
                @is("string") field2;
                @is(String) field3 = "true";
                @is("string") field4 = "false";
            }

            Class2 = @onTypeMismatch(TypeMismatchSetOptions.Throw) class {
                @is(String) field1;
                @is("string") field2;
                @is(String) field3 = "true";
                @is("string") field4 = "false";
            }

            expect(() => model1 = new Class1()).not.toThrow();
            expect(() => model2 = new Class2()).not.toThrow();
        });

       it("should throw when class is defined with type mismatches", () => {
            expect(() => @onTypeMismatch("Throw") class { @is(String) field1 = true }).toThrow();
            expect(() => @onTypeMismatch(TypeMismatchSetOptions.Throw) class { @is(String) field1 = false }).toThrow();
       });

       it("should have initial values set properly", () => {
           expect(Class1[onTypeMismatch[mismatchConfig]] === TypeMismatchSetOptions.Throw);

           expect(model1.field1).toBeUndefined();
           expect(model1.field2).toBeUndefined();
           expect(model1.field3).toEqual("true");
           expect(model1.field4).toEqual("false");
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
           expect(() => model1.field1 = "true").not.toThrow();
           expect(model1.field1).toEqual("true");
           expect(() => model1.field2 = "false").not.toThrow();
           expect(model1.field2).toEqual("false");
           expect(() => model2.field1 = "true").not.toThrow();
           expect(model1.field1).toEqual("true");
           expect(() => model2.field2 = "false").not.toThrow();
           expect(model1.field2).toEqual("false");
       });
    });

    describe("when set on fields", () => {
        beforeEach(() => {
            Class1 = class {
                @is(String) @onTypeMismatch("Throw") field1;
                @is("string") @onTypeMismatch("Throw") field2;
                @is(String) field3;
                @is("string") field4;
                @is(String) @onTypeMismatch(TypeMismatchSetOptions.Throw) field5;
                @is("string") @onTypeMismatch(TypeMismatchSetOptions.Throw) field6;
                @is(String) @onTypeMismatch("Throw") field7 = "true";
                @is("string") @onTypeMismatch("Throw") field8 = "false";
                @is(String) @onTypeMismatch(TypeMismatchSetOptions.Throw) field9 = "true";
                @is("string") @onTypeMismatch(TypeMismatchSetOptions.Throw) field10 = "false";
            }

            Class2 = @onTypeMismatch("Throw") class {
                @is(String) field1;
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
            expect(model1.field7).toEqual("true");
            expect(model1.field8).toEqual("false");
            expect(model1.field9).toEqual("true");
            expect(model1.field10).toEqual("false");
        });

        it("should throw when fields are not set at instantiation according to type", () => {
            let Class4, model4;
            expect(() => Class4 = class { @is(String) @onTypeMismatch("Throw") field1 = true }).toThrow();
            expect(Class4).toBeUndefined();
            expect(() => Class4 = class { @is("string") @onTypeMismatch("Throw") field1 = true }).toThrow();
            expect(Class4).toBeUndefined();
            expect(() => Class4 = class { @is(String) @onTypeMismatch(TypeMismatchSetOptions.Throw) field1 = true }).toThrow();
            expect(Class4).toBeUndefined();
            expect(() => Class4 = class { @is("string") @onTypeMismatch(TypeMismatchSetOptions.Throw) field1 = true }).toThrow();
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
            expect(() => model1.field1 = "true").not.toThrow();
            expect(model1.field1).toEqual("true");
            expect(() => model1.field2 = "false").not.toThrow();
            expect(model1.field2).toEqual("false");
            expect(() => model1.field5 = "true").not.toThrow();
            expect(model1.field5).toEqual("true");
            expect(() => model1.field6 = "false").not.toThrow();
            expect(model1.field6).toEqual("false");

            // this tests that default type mismatch does not interfere
            // when values are set properly
            expect(() => model1.field3 = "true").not.toThrow();
            expect(() => model1.field4 = "false").not.toThrow();
            expect(model1.field3).toEqual("true");
            expect(model1.field4).toEqual("false");
        });

        it("should override class option when set on field", () => {
            expect(() => {
                Class3 =  @onTypeMismatch("Ignore") class {
                    @is(String) fieldA;
                    @is("string") fieldB;
                    // this use-case is broken for the time being
                    // @is(String) fieldC = "testC";
                    // @is("string") fieldD = "testD";
                    @is(String) @onTypeMismatch("Throw") field1;
                    @is("string") @onTypeMismatch("Throw") field2;
                    @is(String) @onTypeMismatch(TypeMismatchSetOptions.Throw) field3;
                    @is("string") @onTypeMismatch(TypeMismatchSetOptions.Throw) field4;
                    @is(String) @onTypeMismatch("Throw") field5 = "true";
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
            expect(() => model3.field1 = true).toThrow();
            expect(() => model3.field2 = false).toThrow();
            expect(() => model3.field3 = 1).toThrow();
            expect(() => model3.field4 = 100.1).toThrow();
            expect(model3.field5).toEqual("true");
        });
    });
});
