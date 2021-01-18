import { Pipeline, PipelineFilter, PipelineArgs } from "../../src/base/components/Pipeline";

class FilterA extends PipelineFilter {
    constructor() {
        super((data) => { data.test1++; return "one"; });
    }
}

class FilterB extends PipelineFilter {
    constructor() {
        super((data) => { data.test1++; return "two"; });
    }
}

class FilterC extends PipelineFilter {
    constructor() {
        super((data) => { data.test1++; return "three"; });
    }
}

class FilterD extends PipelineFilter {
    constructor() {
        super((data) => { this.abort(); return "four"; });
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
        expect(() => pipeline = new Pipeline.createWithFilters(FilterA, FilterB)).not.toThrow();
        expect(pipeline.count).toEqual(2);
    });

    it("should execute basic pipeline and update meta properly", () => {
        let pipeline, argsB;
        const argsA = new PipelineArgs({ test1: 1 });

        expect(() => pipeline = new Pipeline(FilterA, FilterB, FilterC)).not.toThrow();
        expect(pipeline.count).toEqual(3);
        expect(() => argsB = pipeline.execute(argsA)).not.toThrow();
        expect(argsB).toEqual(argsA);
        expect(argsB.data.test1).toEqual(4);
        expect(argsB.meta.filters).toBeInstanceOf(Array);
        expect(argsB.meta.filters).toHaveLength(3);
        expect(argsB.meta.filters[0].name).toEqual("FilterA");
        expect(argsB.meta.filters[0].result).toEqual("one");
    });

    it("should abort properly", () => {
        let pipeline, argsB;
        const argsA = new PipelineArgs({ test1: 1 });

        expect(() => pipeline = new Pipeline(FilterA, FilterB, FilterD, FilterC)).not.toThrow();
        expect(pipeline.count).toEqual(4);
        expect(() => argsB = pipeline.execute(argsA)).not.toThrow();
        expect(argsB.isAborted).toEqual(true);
        expect(argsB.meta.filters).toBeInstanceOf(Array);
        expect(argsB.meta.filters).toHaveLength(3);
        expect(argsB.meta.filters[2].name).toEqual("FilterD");
        expect(argsB.meta.filters[2].value).toBeUndefined();
    });

    it("should execute final filter properly", () => {
        let pipeline;
        const argsA = new PipelineArgs({ test1: 1 });
        const argsB = new PipelineArgs({ test1: 1 });

        expect(() => pipeline = new Pipeline.createWithFilters(FilterA, FilterB).finishWith(FilterC)).not.toThrow();
        expect(pipeline.count).toEqual(2);
        expect(() => pipeline.execute(argsA)).not.toThrow();
        expect(argsA.data.test1).toEqual(4);

        expect(() => pipeline = new Pipeline.createWithFilters(FilterA, FilterD, FilterB).finishWith(FilterC)).not.toThrow();
        expect(pipeline.count).toEqual(3);
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

        expect(() => pipeline = new Pipeline(FilterA)).not.toThrow();
        expect(() => pipeline.execute(argsA, callback)).not.toThrow();
        expect(argsA.data.callback).toEqual("callback");

        expect(() => pipeline = new Pipeline(FilterA, FilterD, FilterB).finishWith(FilterC)).not.toThrow();
        expect(() => pipeline.execute(argsB, callback)).not.toThrow();
        expect(argsB.data.callback).toEqual("callback");
        expect(argsB.data.test1).toEqual(3);
    });
});
