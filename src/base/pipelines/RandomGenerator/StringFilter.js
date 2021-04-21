import { PipelineFilter } from "../../components/Pipeline";
import Utilities from "../../Utilities";

export default class StringFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            if (!data) throw Error("StringFilter: data parameter is invalid");
            if (data.targetType.type !== String) return;

            const { getRandomInt } = Utilities;

            // this will generate a random string value up to 64
            // characters long using 0-9a-z character.

            const arr = Array(getRandomInt(1, 64));

            data.targetValue = [...arr].map(() => Math.random().toString(36)[2]).join("");

            this.abort();
        });
    }
}
