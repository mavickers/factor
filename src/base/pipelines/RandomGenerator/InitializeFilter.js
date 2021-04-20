import { PipelineFilter } from "../../components/Pipeline";
import Globals from "../../Globals";

export default class InitializeFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            // the data arg should be a type; once confirmed we will
            // normalize the data parameter for the remaining filters.

            const newData = { };
            const allTypes = [ ...Globals.Primitives, ...Globals.Structurals ];

            newData.targetType = allTypes.find(type => data[0] === type.type);
            newData.targetValue = undefined;

            return newData.targetType ? newData : this.abort("Specified type invalid");
        });
    }
}
