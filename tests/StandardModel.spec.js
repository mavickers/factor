import StandardModel from "../src/base/classes/StandardModel";
import TypeMismatchSetOptions from "../src/base/classes/flags/TypeMismatchSetOptions";

describe("StandardModel", () => {
    it("should set Boolean values properly", () => {
        class TestModel extends StandardModel {
            boolField1 = { type: Boolean, default: false, readonly: false, onTypeMismatch: new TypeMismatchSetOptions("Throw") };
            // boolField2 = { type: Boolean, default: true, readonly: false };
        }

        TestModel.configure({ onTypeMismatchDefault: new TypeMismatchSetOptions("Noop", true) });

        let testModel;

        expect(TestModel.configuration.onTypeMismatchDefault.equals("Ignore"));
        expect(() => testModel = new TestModel()).not.toThrow();
        // expect(() => testModel.boolField1 = "test").toThrow();
    });
});
