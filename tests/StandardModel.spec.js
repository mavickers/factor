import StandardModel from "../src/base/classes/StandardModel";
import TypeMismatchSetOptions from "../src/base/classes/flags/TypeMismatchSetOptions";

describe("StandardModel", () => {
    it("should run ProcessFields pipeline properly", () => {
        class TestModel extends StandardModel {
            //boolField = { type: Boolean, default: true, readonly: false, onTypeMismatch: new TypeMismatchSetOptions("Throw") };
            boolField = { type: Boolean, default: true, readonly: false };
            // dateField = { type: Date, required: false };
            // numberField = { type: Number };
            // objectField = { type: Object };
            // stringField = { type: String, default: null, required: false  };
        }

        let testModel;

        TestModel.configure({ onTypeMismatchDefault: new TypeMismatchSetOptions("Noop", true) });

        expect(TestModel.configuration.onTypeMismatchDefault.equals("Noop"));
        expect(() => testModel = new TestModel()).not.toThrow();
        expect(TestModel.configuration.onTypeMismatchDefault.equals("Noop"));
        console.log(TestModel.configuration);
        // expect(() => testModel.boolField = true).not.toThrow();
        // expect(testModel.boolField).toEqual(true);
        // expect(() => testModel.boolField = false).not.toThrow();
        // expect(testModel.boolField).toEqual(false);
        // expect(() => testModel.boolField = "test").not.toThrow();
        // expect(testModel.boolField).toEqual(false);

        // let dateTest = new Date(Date.now());
        // expect(() => testModel.dateField = dateTest).not.toThrow();
        // expect(testModel.dateField).toEqual(dateTest);
        // expect(() => testModel.dateField = "test").not.toThrow();
        // expect(testModel.dateField).toEqual(dateTest);
        //
        // expect(() => testModel.numberField = 1).not.toThrow();
        // expect(testModel.numberField).toEqual(1);
        // expect(() => testModel.numberField = 2.01).not.toThrow();
        // expect(testModel.numberField).toEqual(2.01);
        // expect(() => testModel.numberField = "test").not.toThrow();
        // expect(testModel.numberField).toEqual(2.01);
    });
});
