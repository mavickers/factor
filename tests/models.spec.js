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
});

describe("Configurable", () => {
    it("Should fail when attempting to reassign _config in a configured class.", () => {
        class Test extends Configurable { }

        Test.configure({});
        assert.throws(() => Test._config = {});
    })
});
