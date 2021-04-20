import "jest-extended";
import PipelineArgs from "../../../src/base/components/Pipeline/PipelineArgs";

describe("PipelineArgs", () => {
    it("should instantiate and operate PipelineArgs correctly", () => {
        let args;

        // tests on instantiation and meta mutability
        expect(() => args = new PipelineArgs()).not.toThrow();
        expect(() => args.meta = {}).toThrow();
        expect(() => args.meta.test = "test").toThrow();

        // tests on args.error
        expect(() => args.error = Error("test")).not.toThrow();
        expect(args.error).not.toBeNull();
        expect(() => args.error = "Test Message").not.toThrow();
        expect(args.error.message).toEqual("Test Message");

        expect(() => args.error = Error("test")).not.toThrow();
        expect(args.error).not.toBeNull();
        expect(args.error.message).toEqual("test");
    });
});
