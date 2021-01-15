import PipelineArgs from "../src/base/components/Pipeline/PipelineArgs";

describe("Pipelines", () => {
    beforeEach(() => {

    });

    it("PipelineArgs instantiates correctly", () => {
        let args;

        expect(() => args = PipelineArgs.create()).not.toThrow();
        expect(() => args.meta = { }).toThrow();
        expect(() => args.meta.test = "test").toThrow();
        expect(() => args.error = new Error("test")).not.toThrow();
        expect(args.error).toBeNull();
        expect(() => args.error = "Test Message").not.toThrow();

        expect(args.error.message).toEqual("Test Message");
    });
});
