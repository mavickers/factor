import Decorator from "../src/base/classes/Decorator";

const { is, required } = require("../src/base/classes/decorators");

// make sure to return ...descriptor with any customizing during
// decorator init, otherwise you will not be passing along
// important properties such as the initializer to decorators
// downstream.

// subsequent decorators will see accessors on the descriptor,
// and only the last decorator will have setter called, which is
// the left-most or the top-most.

// this is due to the descriptor being rewritten in the init of
// each decorator, so we need to make sure that each setter is
// calling the setter inside the decorator.

// this probably means making a copy of the function,
// a previousSetter, inside each decorator.

const test1 = new Decorator({
    value: undefined,
    get() {
        return this.value;
    },
    set(newValue) {
        console.log("this is the setter");
        this.value = newValue;
    }
})

describe("Decorator integration", () => {
    it("should apply @is and @required together when specified", () => {
        let Class1, model1;

        // expect(() => Class1 = class { @is(Boolean) @required field1 = false; }).not.toThrow();
        // expect(() => Class1 = class { @is(Boolean) @required field1; }).toThrow();


        Class1 = class { @test1 field1 = "false"; }
        model1 = new Class1();
        //model1.field1 = "true!";
        //console.log(model1.field1);
        //model1.field1 = "NO!";
        //console.log(model1.field1);

        //expect(() => Class1 = class { @is(Boolean) @required field1 = "false"; }).toThrow();

        // expect(() => Class1 = class { @is(Boolean) @required field1 = "false"; }).not.toThrow();
        // expect(() => model1 = new Class1()).not.toThrow();
        // expect(() => model1.field1 = "false").toThrow();
        //
        //
        // expect(() => Class1 = class { @is(Boolean) @required field1; }).toThrow();
    });
});
