import StandardModel from "../src/base/classes/StandardModel";
import TypeMismatchSetOptions from "../src/base/classes/flags/TypeMismatchSetOptions";

describe("StandardModel", () => {
    it("should run ProcessFields pipeline properly", () => {
        class TestModel extends StandardModel {
            boolField = { type: Boolean, default: true, readonly: false };
            dateField = { type: Date, required: false };
            numberField = { type: Number };
            objectField = { type: Object };
            stringField = { type: String, default: null, required: false  };
        }

        let testModel;

        TestModel.configure({ onTypeMismatchDefault: new TypeMismatchSetOptions().set(TypeMismatchSetOptions.ErrorOnTypeMismatch) });

        // console.log(TestModel.configuration);
        // console.log(TestModel.configuration.onTypeMismatchDefault.value);
        expect(() => testModel = TestModel.create()).not.toThrow();
        // console.log(TestModel.configuration);
        // console.log(TestModel.configuration.onTypeMismatchDefault.value);
        // console.log(TestModel.configuration.typeMismatchSetOptionDefault.value);
        expect(() => testModel = TestModel.create()).not.toThrow();
        // console.log(TestModel.configuration.fieldDefs.boolField);
        // console.log(1);
        expect(() => testModel.boolField = true).not.toThrow();
        // console.log(2);
        expect(testModel.boolField).toEqual(true);
        expect(() => testModel.boolField = false).not.toThrow();
        expect(testModel.boolField).toEqual(false);
        expect(() => testModel.boolField = "test").not.toThrow();
        expect(testModel.boolField).toEqual(false);

        // let dateTest = new Date(Date.now());
        // expect(() => testModel.dateField = dateTest).not.toThrow();
        // expect(testModel.dateField).toEqual(dateTest);
        // expect(() => testModel.dateField = "test").not.toThrow();
        // expect(testModel.dateField).toEqual(dateTest);
        //
        expect(() => testModel.numberField = 1).not.toThrow();
        expect(testModel.numberField).toEqual(1);
        expect(() => testModel.numberField = 2.01).not.toThrow();
        expect(testModel.numberField).toEqual(2.01);
        expect(() => testModel.numberField = "test").not.toThrow();
        expect(testModel.numberField).toEqual(2.01);
    });
});
