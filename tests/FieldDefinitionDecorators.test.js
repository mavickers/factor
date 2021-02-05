import "jest-extended";
import { readOnly } from "../src/base/classes/decorators";
import Utilities from "../src/base/Utilities";

describe("readOnly Field Definition", () => {
    it("should apply readOnly property properly", () => {
        class Class1 {
            @readOnly field1 = false;
        }

        let model1;

        expect(() => model1 = new Class1()).not.toThrow();
        expect(model1.field1).toBeFalse();
        expect(() => model1.field1 = true).toThrow();
        expect(model1.field1).toBeFalse();
    });
});
