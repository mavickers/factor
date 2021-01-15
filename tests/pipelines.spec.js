import { Pipeline, PipelineArgs, PipelineFilter } from "../src/base/components/Pipeline";

describe("Pipelines", () => {
    it("Instantiates correctly", () => {
        expect(() => PipelineArgs.create()).not.toThrow();
    });
    // it("Is testing", () => {
    //     class FilterOne extends PipelineFilter {
    //         constructor(args, ) {
    //             super();
    //
    //         }
    //     };
    //
    //     const pipeline = Pipeline
    //         .create(FilterOne, FilterTwo, FilterThree)
    //         .withFilter(FilterFive)
    //         .withFilters(FilterSix, FilterSeven)
    //         .withFinish(FilterEight)
    //         .withArgs(paramArgs)
    //         .run(paramArgs);
    //     const args = new PipelineArgs();
    // })
});
