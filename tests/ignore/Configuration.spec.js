import StandardModel from "../../src/base/classes/StandardModel";
import TypeMismatchSetOptions from "../../src/base/classes/flags/TypeMismatchSetOptions";
import Utilities from "../../src/base/Utilities";

describe("Configuration", () => {
    it("should perform basic class configuration properly", () => {
        class TestModel extends StandardModel {
            boolField = { type: Boolean };
        }

        let option1 = new TypeMismatchSetOptions().set(TypeMismatchSetOptions.Throw);

        const obj1 = { one: "1", two: "2" };
        const obj2 = { three: "3", four: "4", fifth: option1 };
        const obj4 = { one: "1", two: { first: "1", second: "2" }, three: { first: "1", second: "2", third: { first: "1" } } };
        const obj5 = { one: "2", two: { first: "1", second: "second", third: "2" }, three: { third: { second: { first: "1", second: "2", third: { first: option1 } } }, fourth: "4", fifth: "5" } };

        let testModel;


        TestModel.configure({ onTypeMismatchDefault: option1 });

        expect(() => testModel = TestModel.create()).not.toThrow();

        expect(Utilities.getClassName(TestModel.configuration.onTypeMismatchDefault)).toEqual("TypeMismatchSetOptions");
        expect(Utilities.getParentClassName(TestModel.configuration.onTypeMismatchDefault)).toEqual("Flags");
        console.log(TestModel.configuration);
    });
})
