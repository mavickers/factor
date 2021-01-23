import { PipelineFilter } from "../../../components/Pipeline";

export default class WrapupFilter extends PipelineFilter {
    constructor() {
        super((data) => {
            data.instance[data.propName] = data.fieldValDefault;
        });
    }
}
