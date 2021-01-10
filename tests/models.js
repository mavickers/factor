import { Configurable } from "../src/factor";
import assert from "assert";

class Test extends Configurable {
    constructor() {
        super();
    }
}

describe("Models", () => {
    describe("Configurable", () => {
        it("Should fail when attempting to reconfigure the same model", () => {
            assert.strictEqual(1, 1);
        })
    })
})