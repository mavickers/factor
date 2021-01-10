import { Configurable } from "../src/factor";

class Test extends Configurable {
    constructor() {
        super();
    }
}

test("First One", () => {
   expect(1).toBe(1);
});
