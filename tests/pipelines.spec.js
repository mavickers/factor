import PipelineArgs from "../src/base/components/Pipeline/PipelineArgs";
import { PipelineFilter } from "../src/base/components/Pipeline";

describe("Pipelines", () => {
    beforeEach(() => {

    });

    it("should instantiate and operate PipelineArgs correctly", () => {
        let args;

        // tests on instantiation and meta mutability
        expect(() => args = new PipelineArgs()).not.toThrow();
        expect(() => args.meta = { }).toThrow();
        expect(() => args.meta.test = "test").toThrow();

        // tests on args.error
        expect(() => args.error = Error("test")).not.toThrow();
        expect(args.error).toBeNull();
        expect(() => args.error = "Test Message").not.toThrow();
        expect(args.error.message).toEqual("Test Message");

        // try to set args.error to an error object again; this should
        // again silently fail, and the prior value should be preserved.
        expect(() => args.error = Error("test")).not.toThrow();
        expect(args.error.message).toEqual("Test Message");
    });

    it("should instantiate and operate PipelineFilters correctly", () => {
        class TestFilterA extends PipelineFilter {
            constructor() {
                super((data) => "RETURN");
            }
        }

        class TestFilterB extends PipelineFilter {
            constructor() {
                super((data) => this.abort());
            }
        }

        let args, filter;

        let nextReturnVal = "321";
        let nextSetVal = "321";
        let next = function(args) {
            nextSetVal = args.data.test;
            args.data.test = "456";
            return "END";
        };
        let processor = (data) => "NEW PROCESSOR";

        // instantiate a filter and execute a processor; validate
        // execution and values.
        args = new PipelineArgs({ test: "123" });
        expect(() => filter = new TestFilterA()).not.toThrow();
        expect(filter.name).toEqual("TestFilterA");
        expect(() => filter.name = "Test").toThrow();
        expect(() => filter.execute(args, null)).toThrow();
        expect(() => nextReturnVal = filter.execute(args, next)).not.toThrow();
        expect(nextSetVal).toEqual("123");
        expect(nextReturnVal).toEqual("END");
        expect(args.meta.filters).toBeInstanceOf(Array);
        expect(args.meta.filters).toHaveLength(1);
        expect(args.meta.filters[0].name).toEqual("TestFilterA");
        expect(args.meta.filters[0].result).toEqual("RETURN");

        // try it again but make the processor abort - validate that
        // the arguments indicate that it was aborted.
        args = new PipelineArgs();
        expect(() => filter = new TestFilterB()).not.toThrow();
        expect(() => filter.execute(args, next)).not.toThrow();
        expect(args.meta.abort).toEqual(true);
        expect(args.isAborted).toEqual(true);

        // test slipping in a new processor
        args = new PipelineArgs();
        expect(() => filter.processor = processor).not.toThrow();
        expect(() => filter.execute(args, next)).not.toThrow();
        expect(args.meta.filters).toBeInstanceOf(Array);
        expect(args.meta.filters).toHaveLength(1);
        expect(args.meta.filters[0].name).toEqual("TestFilterB");
        expect(args.meta.filters[0].result).toEqual("NEW PROCESSOR");
    });
});
