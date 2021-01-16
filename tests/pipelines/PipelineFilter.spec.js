import PipelineArgs from "../../src/base/components/Pipeline/PipelineArgs";
import PipelineFilter from "../../src/base/components/Pipeline/PipelineFilter";

class TestFilterA extends PipelineFilter {
    constructor() {
        super((data) => "RETURN");
    }
}

class TestFilterB extends PipelineFilter {
    constructor() {
        super((data) => {
            data.test2 = "000";
            data.test1 = "456";
            return "END";
        });
    }
}

class TestFilterC extends PipelineFilter {
    constructor() {
        super((data) => this.abort());
    }
}

describe("PipelineFilter", () => {
    it("instantiates and correctly", () => {
        let filter;

        expect(() => filter = new TestFilterA()).not.toThrow();
        expect(filter.name).toEqual("TestFilterA");
        expect(() => filter.name = "Test").toThrow();
    });

    it("executes and updates data properly", () => {
        let filter = new TestFilterB();
        let args = new PipelineArgs({ test1: "123" });
        let returnVal = "321";

        expect(() => returnVal = filter.executeNew(args)).not.toThrow();
        expect(args.data.test1).toEqual("456");
        expect(args.data.test2).toEqual("000");
        expect(returnVal).toEqual("END");
    });

    it("should abort properly", () => {
        let args = new PipelineArgs();
        let filter = new TestFilterA()
        let processor = (data) => "NEW PROCESSOR";
        let returnValue = "testing";

        expect(() => filter = new TestFilterC()).not.toThrow();
        expect(() => filter.executeNew(args)).not.toThrow();
        expect(args.meta.abort).toEqual(true);
        expect(args.isAborted).toEqual(true);

        // test slipping in a new processor
        args = new PipelineArgs();
        expect(() => filter.processor = processor).not.toThrow();
        expect(() => returnValue = filter.executeNew(args)).not.toThrow();
        expect(returnValue).toEqual("NEW PROCESSOR");
    });
});
