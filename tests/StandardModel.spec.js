import StandardModel from "../src/base/classes/StandardModel";
import SetOptions from "../src/base/classes/flags/StandardModelSetOptions";

describe("StandardModel", () => {
    it("should run ProcessFields pipeline properly", () => {
        class TestModel extends StandardModel {
            // fieldDef: type, default, required, readonly, onTypeMismatch

            boolField = { type: Boolean, default: true, readonly: true };
            dateField = { type: Date, required: false };
            numberField = { type: Number };
            objectField = { type: Object };
            stringField = { type: String, default: null, required: false  };
        }


        let testModel;

        // TestModel.configure({ setOptions: new SetOptions().set(SetOptions.ErrorOnTypeMismatch) });
        expect(() => testModel = TestModel.create()).not.toThrow();
        expect(() => testModel = TestModel.create()).not.toThrow();
        expect(() => testModel.boolField = true).not.toThrow();
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
