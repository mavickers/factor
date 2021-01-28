import StandardModel from "../src/base/classes/StandardModel";
import TypeMismatchSetOptions from "../src/base/classes/flags/TypeMismatchSetOptions";
import Globals from "../src/base/Globals";
import { Logger } from "../src/factor";
import { readOnly } from "../src/base/classes/decorators";

const { Factor } = Globals;

describe("StandardModel", () => {
    it("should handle boolean fields correctly", () => {
        const logger = new Logger();

        const is = (...extArgs) => {
            logger.log("is ext", extArgs.length, extArgs[0] === Boolean);
            return (...intArgs) => {
                logger.log("is int", intArgs.length, intArgs[0]);
            }
        }



        const testing = function(descriptor) {
            console.log(descriptor.value);

            return descriptor;
        }

        function tracked({get, set}) {
            return {
                kind: "field",
                placement: "prototype",
                get: (value) => value,
                set(value) {
                    if (get.call(this) !== value) {
                        set.call(this, value);
                        this.render();
                    }
                }
            };
        }

        const model = function(target) {
            logger.log("model");

            return target;
        }

        logger.log("class def");

        class TestModel {
            //boolField1 = { type: Boolean, default: false, onTypeMismatch: new TypeMismatchSetOptions("Ignore") };
            @tracked
            boolField2 = true;

            constructor() {
                logger.log("constructor");
            }

            // boolField2 = { type: Boolean, default: false, onTypeMismatch: new TypeMismatchSetOptions("Noop") };
            // boolField3 = { type: Boolean, default: false, onTypeMismatch: new TypeMismatchSetOptions("Null") };
            // boolField4 = { type: Boolean, default: false, onTypeMismatch: new TypeMismatchSetOptions("Throw") };
        }


        let testModel;

        Factor.logMute = false;

        logger.log("expect");
        expect(() => testModel = new TestModel()).not.toThrow();

        logger.log(testModel.boolField2?.toString() ?? "");

        logger.log("resetting");
        logger.log(testModel.boolField3);
        logger.flush();


        // expect(testModel.boolField1).toEqual(false);
        // expect(testModel.boolField2).toEqual(false);
        // expect(testModel.boolField3).toEqual(false);
        // expect(testModel.boolField4).toEqual(false);
        //
        // expect(() => testModel.boolField1 = true).not.toThrow();
        // expect(testModel.boolField1).toEqual(true);
        //
        // expect(() => testModel.boolField2 = "true").not.toThrow();
        // expect(() => testModel.boolField2).toEqual(false);
        //
        // expect(() => testModel.boolField3 = "true").not.toThrow();
        // expect(() => testModel.boolField3).toEqual(false);
    });


    //
    // it("should set Boolean values properly", () => {
    //     Factor.logMute = false
    //
    //     class TestModel extends StandardModel {
    //         boolField1 = { type: Boolean, default: false, readonly: false, onTypeMismatch: new TypeMismatchSetOptions("Throw") };
    //         // boolField2 = { type: Boolean, default: true, readonly: false };
    //     }
    //
    //     TestModel.configure({ onTypeMismatchDefault: new TypeMismatchSetOptions("Noop", true) });
    //
    //     let testModel;
    //
    //     expect(TestModel.configuration.onTypeMismatchDefault.equals("Ignore"));
    //     expect(() => testModel = new TestModel()).not.toThrow();
    //     // expect(() => testModel.boolField1 = "test").toThrow();
    // });
});
