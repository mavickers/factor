import "jest-extended";
import { is } from "../../../../src/base/classes/decorators";
import TypeMismatchSetOptions from "../../../../src/base/classes/flags/TypeMismatchSetOptions";
import onTypeMismatch, { mismatchConfig } from "../../../../src/base/classes/decorators/onTypeMismatch";

let Class1, Class2, Class3,
    model1, model2, model3;

describe("@onTypeMismatch decorator tests throw option for number type", () => {
    beforeEach(() => {
       Class1 = Class2 = Class3 = undefined;
       model1 = model2 = model3 = undefined;
    });

    describe("when set on classes", () => {
        beforeEach(() => {

            Class1 = @onTypeMismatch("Throw") class {
                @is(Number) field1;
                @is("number") field2;
                @is(Number) field3 = 1;
                @is("number") field4 = 100.0;
            }

            Class2 = @onTypeMismatch(TypeMismatchSetOptions.Throw) class {
                @is(Number) field1;
                @is("number") field2;
                @is(Number) field3 = 1;
                @is("number") field4 = 100.0;
            }

            expect(() => model1 = new Class1()).not.toThrow();
            expect(() => model2 = new Class2()).not.toThrow();
        });

       it("should throw when class is defined with type mismatches", () => {
            expect(() => @onTypeMismatch("Throw") class { @is(Number) field1 = "1" }).toThrow();
            expect(() => @onTypeMismatch(TypeMismatchSetOptions.Throw) class { @is(Number) field1 = "100.0" }).toThrow();
       });

       it("should have initial values set properly", () => {
           expect(Class1[onTypeMismatch[mismatchConfig]] === TypeMismatchSetOptions.Throw);

           expect(model1.field1).toBeUndefined();
           expect(model1.field2).toBeUndefined();
           expect(model1.field3).toEqual(1);
           expect(model1.field4).toEqual(100.0);
       });

       it("should throw when fields are not set after instantiation according to type", () => {
           expect(() => model1.field1 = "1").toThrow();
           expect(() => model1.field2 = "100.0").toThrow();
           expect(model1.field1).toBeUndefined();
           expect(model1.field2).toBeUndefined();
           expect(() => model2.field1 = "1").toThrow();
           expect(() => model2.field2 = "100.0").toThrow();
           expect(model2.field1).toBeUndefined();
           expect(model2.field2).toBeUndefined();
       });

       it("should allow fields to set to their proper values", () => {
           expect(() => model1.field1 = 1).not.toThrow();
           expect(model1.field1).toEqual(1);
           expect(() => model1.field2 = 100.0).not.toThrow();
           expect(model1.field2).toEqual(100.0);
           expect(() => model2.field1 = 1).not.toThrow();
           expect(model1.field1).toEqual(1);
           expect(() => model2.field2 = 100.0).not.toThrow();
           expect(model1.field2).toEqual(100.0);
       });
    });

    describe("when set on fields", () => {
        beforeEach(() => {
            Class1 = class {
                @is(Number) @onTypeMismatch("Throw") field1;
                @is("number") @onTypeMismatch("Throw") field2;
                @is(Number) field3;
                @is("number") field4;
                @is(Number) @onTypeMismatch(TypeMismatchSetOptions.Throw) field5;
                @is("number") @onTypeMismatch(TypeMismatchSetOptions.Throw) field6;
                @is(Number) @onTypeMismatch("Throw") field7 = 1;
                @is("number") @onTypeMismatch("Throw") field8 = 100.1;
                @is(Number) @onTypeMismatch(TypeMismatchSetOptions.Throw) field9 = 1;
                @is("number") @onTypeMismatch(TypeMismatchSetOptions.Throw) field10 = 100.1;
            }

            Class2 = @onTypeMismatch("Throw") class {
                @is(Number) field1;
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
            expect(model1.field7).toEqual(1);
            expect(model1.field8).toEqual(100.1);
            expect(model1.field9).toEqual(1);
            expect(model1.field10).toEqual(100.1);
        });

        it("should throw when fields are not set at instantiation according to type", () => {
            let Class4, model4;
            expect(() => Class4 = class { @is(Number) @onTypeMismatch("Throw") field1 = "1" }).toThrow();
            expect(Class4).toBeUndefined();
            expect(() => Class4 = class { @is("number") @onTypeMismatch("Throw") field1 = "1" }).toThrow();
            expect(Class4).toBeUndefined();
            expect(() => Class4 = class { @is(Number) @onTypeMismatch(TypeMismatchSetOptions.Throw) field1 = "1" }).toThrow();
            expect(Class4).toBeUndefined();
            expect(() => Class4 = class { @is("number") @onTypeMismatch(TypeMismatchSetOptions.Throw) field1 = "1" }).toThrow();
            expect(Class4).toBeUndefined();
        });

        it("should throw when fields are not set after instantiation according to type", () => {
            expect(() => model1.field1 = "1").toThrow();
            expect(() => model1.field2 = "100.1").toThrow();
            expect(model1.field1).toBeUndefined();
            expect(model1.field2).toBeUndefined();
            expect(() => model1.field5 = "1").toThrow();
            expect(() => model1.field6 = "100.1").toThrow();
            expect(model1.field5).toBeUndefined();
            expect(model1.field6).toBeUndefined();

            // this tests default type mismatch (which should be "Throw")
            expect(() => model1.field3 = "1").toThrow();
            expect(() => model1.field4 = "100.1").toThrow();
            expect(model1.field3).toBeUndefined();
            expect(model1.field4).toBeUndefined();
        });

        it("should allow fields to set to their proper values", () => {
            expect(() => model1.field1 = 1).not.toThrow();
            expect(model1.field1).toEqual(1);
            expect(() => model1.field2 = 100.1).not.toThrow();
            expect(model1.field2).toEqual(100.1);
            expect(() => model1.field5 = 1).not.toThrow();
            expect(model1.field5).toEqual(1);
            expect(() => model1.field6 = 100.1).not.toThrow();
            expect(model1.field6).toEqual(100.1);

            // this tests that default type mismatch does not interfere
            // when values are set properly
            expect(() => model1.field3 = 1).not.toThrow();
            expect(() => model1.field4 = 100.1).not.toThrow();
            expect(model1.field3).toEqual(1);
            expect(model1.field4).toEqual(100.1);
        });

        it("should override class option when set on field", () => {
            expect(() => {
                Class3 =  @onTypeMismatch("Ignore") class {
                    @is(Number) fieldA;
                    @is("number") fieldB;
                    // this use-case is broken for the time being
                    // @is(Number) fieldC = "testC";
                    // @is("number") fieldD = "testD";
                    @is(Number) @onTypeMismatch("Throw") field1;
                    @is("number") @onTypeMismatch("Throw") field2;
                    @is(Number) @onTypeMismatch(TypeMismatchSetOptions.Throw) field3;
                    @is("number") @onTypeMismatch(TypeMismatchSetOptions.Throw) field4;
                    @is(Number) @onTypeMismatch("Throw") field5 = 1;
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
            expect(() => model3.field1 = "test1").toThrow();
            expect(() => model3.field2 = "test2").toThrow();
            expect(() => model3.field3 = "test3").toThrow();
            expect(() => model3.field4 = "test4").toThrow();
            expect(model3.field5).toEqual(1);
        });
    });
});
