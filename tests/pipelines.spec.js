import PipelineArgs from "../src/base/components/Pipeline/PipelineArgs";
import { PipelineFilter } from "../src/base/components/Pipeline";

describe("Pipelines", () => {
    beforeEach(() => {

    });

    it("should instantiate and operate PipelineArgs correctly", () => {
        let args;

        expect(() => args = PipelineArgs.create()).not.toThrow();
        expect(() => args.meta = { }).toThrow();
        expect(() => args.meta.test = "test").toThrow();

        /*
         * tests on args.error
         *
         */
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
        class TestFilter extends PipelineFilter { };

        let args = PipelineArgs.create({ test: "123" });
        let filter;

        let nextReturnVal = "321";
        let nextSetVal = "321";
        let next = function(args) {
            nextSetVal = args.data.test;
            args.data.test = "456";
            return "END";
        };

        expect(() => filter = TestFilter.create()).not.toThrow();
        expect(filter.name).toEqual("TestFilter");
        expect(() => filter.name = "Test").toThrow();
        expect(() => filter = TestFilter.create((p,n,c) => true )).not.toThrow();
        expect(filter.abort).toBeUndefined();
        expect(() => filter.execute(args, null)).toThrow();
        expect(() => nextReturnVal = filter.execute(args, next)).not.toThrow();
        expect(nextSetVal).toEqual("123");
        expect(nextReturnVal).toEqual("END");
    });
});
