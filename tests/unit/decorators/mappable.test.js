import "jest-extended";
import { is, mappable } from "../../../src/base/classes/decorators";

describe("@mappable decorator tests", () => {
    it("should apply @mappable decorator properly", () => {

        // readOnly should deny the ability to set a value on a
        // field; should throw when trying to assign.

        @mappable class Class1 {
            @is(String) field1;

            constructor (...args) {
                this.constructor.mapFrom
            }
        };

        Class1.test1 = function() { return "hello"; };

        let model1;

        expect(() => model1 = new Class1()).not.toThrow();
    });
});
