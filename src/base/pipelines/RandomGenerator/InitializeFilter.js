import PipelineFilter from "../../components/Pipeline/PipelineFilter";
import Globals from "../../Globals";
import { isType } from "../../Utilities/types";

export default class InitializeFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            // the data arg should be a type; once confirmed we will
            // normalize the data parameter for the remaining filters.

            if (!(data && data[0].type)) throw Error("InitializeFilter: data parameter invalid");

            const newData = { };
            const allTypes = [ ...Globals.Primitives, ...Globals.Structurals ];

            newData.targetType = allTypes.find(type => data[0].type === type.type);
            newData.targetValue = undefined;

            // params specific to Number
            newData.withPositiveOnly = isType(data[0].positive, Boolean) ? data[0].positive : true;
            newData.withWholeValue = isType(data[0].whole, Boolean) ? data[0].whole : true;
            newData.maxValue = isType(data[0].max, Number) && data[0].max || 10;
            newData.minValue = isType(data[0].min, Number) && data[0].min || -10;
            newData.minValue = newData.withPositiveOnly && newData.minValue < 0 ? 0 : newData.minValue;

            if (newData.maxValue < newData.minValue) throw Error("Invalid min/max values");

            return newData.targetType ? newData : this.abort("Specified type invalid");
        });
    }
}
