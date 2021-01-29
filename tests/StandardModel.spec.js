import StandardModel from "../src/base/classes/StandardModel";
import TypeMismatchSetOptions from "../src/base/classes/flags/TypeMismatchSetOptions";
import Globals from "../src/base/Globals";
import { Configurable, Logger, Utilities } from "../src/factor";
import { configurable, isBoolean, noopMismatch, readOnly } from "../src/base/classes/decorators";
import Classes from "../src/base/Classes";

const { Factor } = Globals;

describe("StandardModel", () => {
    it("should handle boolean fields correctly", () => {
        const logger = new Logger();

        function tracked(target, name, descriptor) {
            if (!Utilities.isInheriting(target, Configurable)) return target;



            console.log("this is a configurable class");

            return descriptor;
        }

        @tracked @configurable
        class TestModel {
            //boolField1 = { type: Boolean, default: false, onTypeMismatch: new TypeMismatchSetOptions("Ignore") };
            @isBoolean @noopMismatch
            boolField2 = true;

            constructor() {
                logger.log("constructor");
            }

            // boolField2 = { type: Boolean, default: false, onTypeMismatch: new TypeMismatchSetOptions("Noop") };
            // boolField3 = { type: Boolean, default: false, onTypeMismatch: new TypeMismatchSetOptions("Null") };
            // boolField4 = { type: Boolean, default: false, onTypeMismatch: new TypeMismatchSetOptions("Throw") };
        }

        console.log(Object.getOwnPropertyDescriptors(TestModel));

        let testModel;

        Factor.logMute = false;

        logger.log("expect");
        expect(() => testModel = new TestModel()).not.toThrow();
        testModel.boolField2 = false;

        console.log(TestModel.configure);

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
