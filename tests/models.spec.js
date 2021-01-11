import { AutoModel, Configurable } from "../src/factor";

describe("AutoModel", () => {
    it("Should not fail on secondary instantiations", () => {
        class Test extends AutoModel {
            field1 = {type: String};
        }

        expect(() => {
            Test.create();
            Test.create();
        }).not.toThrow();
    });

    it("Should silently fail when assigning the wrong value type", () => {
        class Test extends AutoModel {
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

        expect(() => test1.field4 = "test").toThrow();
        expect(test1.field4).toBeUndefined();
    });

    it("Should set property values using setValue method", () => {
        class Test extends AutoModel {
            field1 = {type: String};
        };

        const test1 = Test.create();

        test1.setValue("field1", "test");
        expect(test1.field1).toEqual("test");
        test1.setValue("field1", 1);
        expect(test1.field1).toBeNull();
        expect(() => test1.setValue("field2", "test")).not.toThrow();
        expect(test1.field2).toBeUndefined();
    });
});

describe("Configurable", () => {
    it("Should fail when attempting to reassign _config in a configured class.", () => {
        class Test extends Configurable {}

        Test.configure({});
        expect(() => Test._config = {}).toThrow();
    })
});
