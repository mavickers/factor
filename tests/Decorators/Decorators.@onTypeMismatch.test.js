import "jest-extended";
import { is } from "../../src/base/classes/decorators";
import TypeMismatchSetOptions from "../../src/base/classes/flags/TypeMismatchSetOptions";
import onTypeMismatch, { mismatchConfig } from "../../src/base/classes/decorators/onTypeMismatch";

let Class1, Class2, Class3,
    model1, model2, model3;

describe("@onTypeMismatch decorator tests", () => {
    beforeEach(() => {
       Class1 = Class2 = Class3 = undefined;
       model1 = model2 = model3 = undefined;
    });

    it("should execute ignore option properly", () => {

    });

    it("should execute noop option properly", () => {

    });

    it("should execute null option properly", () => {

    });

    it("should handle special cases properly", () => {
        // multiple on the same field/class
    });
})
