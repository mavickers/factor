import { PipelineFilter } from "../../src/base/components/Pipeline";

class FilterA extends PipelineFilter {
    constructor() {
        super((data) => {

        });
    }
}

describe("Pipeline", () => {
   it("should instantiate properly");
});


// todo: moved from PipelineFilter tests
// expect(args.meta.filters).toBeInstanceOf(Array);
// expect(args.meta.filters).toHaveLength(1);
// expect(args.meta.filters[0].name).toEqual("TestFilterA");
// expect(args.meta.filters[0].result).toEqual("RETURN");
