import PipelineFilter from "../../components/Pipeline/PipelineFilter";
import { isPureObject, merge } from "../../Utilities/objects";

export default class NormalizeDataParametersFilter extends PipelineFilter {
    constructor() {
        super((data) => {
            if (!data) return this.abort("data parameter is invalid");

            // we are accommodating initializing PipelineArgs with either an
            // array, an object or an array of objects; parsing the actual
            // values will be the problem of the consumer.
            const args = Array.isArray(data) ? data : [ data ];
            let result = { };

            args.filter(arg => isPureObject(arg)).forEach(arg => result = merge(result, arg))

            // we want to reserve the "arguments" property, so abort if it was
            // names in PipelineArgs.
            if (Object.keys(result).includes("arguments")) return this.abort("data parameter includes a property with reserved name of 'arguments'");

            result.arguments = [ ]

            args.filter(arg => !isPureObject(arg)).forEach(arg => result.arguments.push(arg));

            return result;
        })
    }
}
