import { Configurable } from "../src/factor";
import assert from "assert";

describe("Configurable", () => {
    it("Should fail when attempting to reassign _config in a configured class.", () => {
        class Test extends Configurable { }
        Test.configure({});
        assert.throws(() => Test._config = { });
    })


});
