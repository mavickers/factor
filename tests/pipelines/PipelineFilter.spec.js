import PipelineArgs from "../../src/base/components/Pipeline/PipelineArgs";
import PipelineFilter from "../../src/base/components/Pipeline/PipelineFilter";
import NormalizeDataParametersFilter from "../../src/base/pipelines/Common/NormalizeDataParametersFilter";
import { Pipeline } from "../../src/base/components/Pipeline";

class TestFilterA extends PipelineFilter {
    constructor() {
        super((data) => "RETURN");
    }
}

class TestFilterB extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            data.test2 = "000";
            data.test1 = "456";
        });
    }
}

class TestFilterC extends PipelineFilter {
    constructor() {
        super((data) => this.abort());
    }
}

const processorReplacement = (data) => {
    data.test1 = "abcde";
    data.test2 = "vwxyz";
};

describe("PipelineFilter", () => {
    it("instantiates and correctly", () => {
        let filter;

        expect(() => filter = new TestFilterA()).not.toThrow();
        expect(filter.name).toEqual("TestFilterA");
        expect(() => filter.name = "Test").toThrow();
    });

    it("executes and updates data properly", () => {
        let args = new PipelineArgs({ test1: "123" });
        let returnVal = "321";
        let pipeline = Pipeline.createWith(NormalizeDataParametersFilter, TestFilterB);

        expect(() => returnVal = pipeline.execute(args)).not.toThrow();
        expect(args.data.test1).toEqual("456");
        expect(args.data.test2).toEqual("000");
    });

    it("should abort properly", () => {
        let args = new PipelineArgs();
        let filter = new TestFilterA()
        let returnValue = "testing";

        expect(() => filter = new TestFilterC()).not.toThrow();
        expect(() => filter.execute(args)).not.toThrow();
        expect(args.meta.abort).toEqual(true);
        expect(args.isAborted).toEqual(true);
    });

    it("should view and swap processor function properly", () => {
        let filter = new TestFilterB();
        let args = new PipelineArgs({ test1: "123" });
        let returnVal = "321";

        expect(() => returnVal = filter.execute(args)).not.toThrow();
        expect(returnVal).toBeNull();
        expect(() => filter.processor = processorReplacement).not.toThrow();
        expect(filter.processor).toEqual(processorReplacement);
        expect(() => returnVal = filter.execute(args)).not.toThrow();
        expect(args.data.test1).toEqual("abcde");
        expect(args.data.test2).toEqual("vwxyz");
        expect(returnVal).toBeNull();
    });
});
