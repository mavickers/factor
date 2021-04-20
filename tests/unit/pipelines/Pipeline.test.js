import Pipeline from "../../../src/base/components/Pipeline/Pipeline";
import PipelineArgs from "../../../src/base/components/Pipeline/PipelineArgs";
import PipelineFilter from "../../../src/base/components/Pipeline/PipelineFilter";
import NormalizeDataParametersFilter from "../../../src/base/pipelines/Common/NormalizeDataParametersFilter";

class FilterA extends PipelineFilter {
    constructor() {
        super((data) => { data.test1++; return data; });
    }
}

class FilterB extends PipelineFilter {
    constructor() {
        super((data) => { data.test1++; });
    }
}

class FilterC extends PipelineFilter {
    constructor() {
        super((data) => { data.test1++; });
    }
}

class FilterD extends PipelineFilter {
    constructor() {
        super((data) => { this.abort("test abort"); return data; });
    }
}

describe("Pipeline", () => {
    it("should instantiate properly", () => {
        let pipeline;

        expect(() => pipeline = new Pipeline()).not.toThrow();
        expect(pipeline.count).toEqual(0);
        expect(() => pipeline = new Pipeline(FilterA)).not.toThrow();
        expect(pipeline.count).toEqual(1);
        expect(() => pipeline = new Pipeline(FilterA, FilterB)).not.toThrow();
        expect(pipeline.count).toEqual(2);
        expect(() => pipeline = new Pipeline().filterWith(FilterA, FilterB)).not.toThrow();
        expect(pipeline.count).toEqual(2);
        expect(() => pipeline = new Pipeline.create(FilterA, FilterB)).not.toThrow();
        expect(pipeline.count).toEqual(0);
        expect(() => pipeline = new Pipeline.createWith(FilterA, FilterB)).not.toThrow();
        expect(pipeline.count).toEqual(2);
    });

    it("should execute basic pipeline and update meta properly", () => {
        let pipeline, argsB;
        const argsA = new PipelineArgs({ test1: 1 });

        expect(() => pipeline = new Pipeline(NormalizeDataParametersFilter, FilterA, FilterB, FilterC)).not.toThrow();
        expect(pipeline.count).toEqual(4);
        expect(() => argsB = pipeline.execute(argsA)).not.toThrow();
        expect(argsB).toEqual(argsA);
        expect(argsB.data.test1).toEqual(4);
        expect(argsB.meta.filters).toBeInstanceOf(Array);
        expect(argsB.meta.filters).toHaveLength(4);
        expect(argsB.meta.filters[1].name).toEqual("FilterA");
        expect(argsB.meta.filters[1].result).toEqual({ test1: 4, arguments: [ ] });
    });

    it("should abort properly", () => {
        let pipeline, argsB;
        const argsA = new PipelineArgs({ test1: 1 });

        expect(() => pipeline = new Pipeline(NormalizeDataParametersFilter, FilterA, FilterB, FilterD, FilterC)).not.toThrow();
        expect(pipeline.count).toEqual(5);
        expect(() => argsB = pipeline.execute(argsA)).not.toThrow();
        expect(argsB.isAborted).toEqual(true);
        expect(argsB.meta.abortedWith).toEqual("test abort");
        expect(argsB.meta.filters).toBeInstanceOf(Array);
        expect(argsB.meta.filters).toHaveLength(4);
        expect(argsB.meta.filters[3].name).toEqual("FilterD");
        expect(argsB.meta.filters[3].value).toBeUndefined();
    });

    it("should execute final filter properly", () => {
        let pipeline;
        const argsA = new PipelineArgs({ test1: 1 });
        const argsB = new PipelineArgs({ test1: 1 });

        expect(() => pipeline = new Pipeline.createWith(NormalizeDataParametersFilter, FilterA, FilterB).finishWith(FilterC)).not.toThrow();
        expect(pipeline.count).toEqual(3);
        expect(() => pipeline.execute(argsA)).not.toThrow();
        expect(argsA.data.test1).toEqual(4);

        expect(() => pipeline = new Pipeline.createWith(NormalizeDataParametersFilter, FilterA, FilterD, FilterB).finishWith(FilterC)).not.toThrow();
        expect(pipeline.count).toEqual(4);
        expect(() => pipeline.execute(argsB)).not.toThrow();
        expect(argsB.data.test1).toEqual(3);
    });

    it("should execute callback properly", () => {
        let pipeline;
        const argsA = new PipelineArgs({ test1: 1 });
        const argsB = new PipelineArgs({ test1: 1 });

        const callback = function(args) {
            args.data.callback = "callback";
        }

        expect(() => pipeline = new Pipeline(NormalizeDataParametersFilter, FilterA)).not.toThrow();
        expect(() => pipeline.execute(argsA, callback)).not.toThrow();
        expect(argsA.data.callback).toEqual("callback");

        expect(() => pipeline = new Pipeline(NormalizeDataParametersFilter, FilterA, FilterD, FilterB).finishWith(FilterC)).not.toThrow();
        expect(() => pipeline.execute(argsB, callback)).not.toThrow();
        expect(argsB.data.callback).toEqual("callback");
        expect(argsB.data.test1).toEqual(3);
    });
});
