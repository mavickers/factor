import { PipelineFilter } from "../../components/Pipeline";

export default class StringFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            if (!data) throw Error("StringFilter: data parameter is invalid");
            if (data.targetType.type !== String) return;

            // this will generate a random string value up to 64
            // characters long using 0-9a-z character.

            data.targetValue = [...Array(Math.floor(Math.random() * 64) + 1)].map(() => Math.random().toString(36)[2]).join("");

            this.abort();
        });
    }
}
