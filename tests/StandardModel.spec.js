import Globals from "../src/base/Globals";
import { Logger} from "../src/factor";
import { configurable, describable, isBoolean, noopMismatch, readOnly } from "../src/base/classes/decorators";

const { Factor } = Globals;

describe("StandardModel", () => {
    it("should handle boolean fields correctly", () => {
        const logger = new Logger();

        @describable @configurable
        class Test1 {
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

        let testModel;


        Factor.logMute = false;

        expect(() => testModel = new Test1()).not.toThrow();
        console.log(testModel.className);
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
