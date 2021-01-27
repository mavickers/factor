import StandardModel from "../src/base/classes/StandardModel";
import TypeMismatchSetOptions from "../src/base/classes/flags/TypeMismatchSetOptions";
import Globals from "../src/base/Globals";

const { Factor } = Globals;

describe("StandardModel", () => {
    it("should handle boolean fields correctly", () => {
        class TestModel extends StandardModel {
            boolField1 = { type: Boolean, default: false, onTypeMismatch: new TypeMismatchSetOptions("Ignore") };
            boolField2 = { type: Boolean, default: false, onTypeMismatch: new TypeMismatchSetOptions("Noop") };
            boolField3 = { type: Boolean, default: false, onTypeMismatch: new TypeMismatchSetOptions("Null") };
            boolField4 = { type: Boolean, default: false, onTypeMismatch: new TypeMismatchSetOptions("Throw") };
        }

        let testModel;

        Factor.logMute = false;

        expect(() => testModel = new TestModel()).not.toThrow();
        expect(testModel.boolField1).toEqual(false);
        expect(testModel.boolField2).toEqual(false);
        expect(testModel.boolField3).toEqual(false);
        expect(testModel.boolField4).toEqual(false);

        expect(() => testModel.boolField1 = true).not.toThrow();
        expect(testModel.boolField1).toEqual(true);

        expect(() => testModel.boolField2 = "true").not.toThrow();
        expect(() => testModel.boolField2).toEqual(false);

        expect(() => testModel.boolField3 = "true").not.toThrow();
        expect(() => testModel.boolField3).toEqual(false);
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
