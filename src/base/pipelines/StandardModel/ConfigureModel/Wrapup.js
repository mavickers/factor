import { PipelineFilter } from "../../../components/Pipeline";

export default class Wrapup extends PipelineFilter {
    constructor() {
        super((data) => {
            this.message();

            console.log(this.messages[0], ...this.messages[1]);
        })
    }
}
