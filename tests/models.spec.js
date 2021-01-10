import { AutoModel, Configurable } from "../src/factor";
import assert from "assert";

describe("AutoModel", () => {
    it("Should not fail on secondary instantiations", () => {
        class Test extends AutoModel {
            field1 = { type: String };
        }

        assert.doesNotThrow(() => {
            Test.new();
            Test.new();
        })
    });

    it("Should silently fail when assigning the wrong value type", () => {
        class Test extends AutoModel {
            field1 = { type: String };
            field2 = { type: Number };
            field3 = { type: Boolean };
        }

        const test1 = Test.new();

        test1.field1 = 1;
        assert.notEqual(test1.field1, 1);
        test1.field1 = false;
        assert.notEqual(test1.field1, false);
        test1.field2 = false;
        assert.notEqual(test1.field2, false);
        test1.field2 = "test";
        assert.notEqual(test1.field2, "test");
        test1.field3 = "test";
        assert.notEqual(test1.field3, "test");
        test1.field3 = 1;
        assert.notEqual(test1.field3, 1);
    });
});

describe("Configurable", () => {
    it("Should fail when attempting to reassign _config in a configured class.", () => {
        class Test extends Configurable { }

        Test.configure({});
        assert.throws(() => Test._config = {});
    })
});
