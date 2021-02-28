const { is, required } = require("../../src/base/classes/decorators");

describe("Decorator combination tests", () => {
    it("should apply @is and @required together when specified", () => {
        let Class1, model1;

        expect(() => Class1 = class { @is(Boolean) @required field1 = false; }).not.toThrow();
        expect(() => Class1 = class { @is(Boolean) @required field1; }).toThrow();
        expect(() => Class1 = class { @is(Boolean) @required field1 = "false"; }).toThrow();
        expect(() => model1 = new Class1()).not.toThrow();
        expect(() => model1.field1 = "false").toThrow();
        expect(() => Class1 = class { @is(Boolean) @required field1; }).toThrow();

        // todo: more tests to add here.
    });
});
