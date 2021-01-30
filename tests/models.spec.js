import Configurable from "../src/base/interfaces/Configurable";
import StandardModel from "../src/base/classes/StandardModel"

describe("StandardModel", () => {
    it("Should not fail on secondary instantiations", () => {
        class Test extends StandardModel {
            field1 = {type: String};
        }

        expect(() => {
            Test.create();
            Test.create();
        }).not.toThrow();
    });

    it("Should silently fail when assigning the wrong value type", () => {
        class Test extends StandardModel {
            field1 = {type: String};
            field2 = {type: Number};
            field3 = {type: Boolean};
        }

        const test1 = Test.create();

        test1.field1 = 1;
        expect(test1.field1).not.toEqual(1);
        test1.field1 = false;
        expect(test1.field1).not.toEqual(false);
        test1.field2 = false;
        expect(test1.field2).not.toEqual(false);
        test1.field2 = "test";
        expect(test1.field2).not.toEqual("test");
        test1.field3 = "test";
        expect(test1.field3).not.toEqual("test");
        test1.field3 = 1;
        expect(test1.field3).not.toEqual(1);
    });

    it("Should not allow assigning values to new fields", () => {
        class Test extends StandardModel {
            field1 = {type: String};
            field2 = {type: Number};
            field3 = {type: Boolean};
        }

        const test1 = Test.create();

        expect(() => test1.field4 = "test").toThrow();
        expect(test1.field4).toBeUndefined();
    })
});

describe("Configurable", () => {
    it("Should fail when attempting to reassign _config in a configured class.", () => {
        class Test extends Configurable {}

        Test.configure({});
        expect(() => Test._config = {}).toThrow();
    })
});
