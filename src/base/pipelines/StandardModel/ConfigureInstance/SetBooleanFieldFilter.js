import PipelineFilter from "../../../components/Pipeline/PipelineFilter";
import Utilities from "../../../Utilities";
import TypeMismatchSetOptions from "../../../classes/flags/TypeMismatchSetOptions";

export default class SetBooleanFieldFilter extends PipelineFilter {
    constructor() {
        super((data) => {
            if (!data) return this.abort("data parameter is invalid");

            const { propNames, fieldDefs } = data.config;
            const { is } = Utilities;
            const fields = fieldDefs.filter(field => field.type === Boolean);

            if (fields.length == 0) return;

            const setter = function(field) { return function(value) {
                console.log("setting");
                // console.log(field);
                console.log(value);

                if (!field) throw new Error("setter received invalid 'field' parameter");
                if (Utilities.isBoolean(value)) return data.fieldVals[field.name] = value;

                console.log("mismatch");
                throw new Error("mismatch");

                const typeMismatch = field.onTypeMismatch || data.config.onTypeMismatch || new TypeMismatchSetOptions("Noop");

                if (typeMismatch.equals("Ignore")) return data.fieldVals[field.name] = value;
                if (typeMismatch.equals("Noop")) return data.fieldVals[field.name] = data.fieldVals[field.name];
                if (typeMismatch.equals("Null")) return data.fieldVals[field.name] = null;
                if (typeMismatch.equals("Throw")) throw new Error(`type mismatch attempting to set value on ${field.name}`);
            }};

            fields.forEach(field => {
                const config = {
                    enumerable: true,
                    get:() => data.fieldVals[field.name] || false,
                    set:!field.readonly && setter(field)
                };

                delete data.newInstance["boolField"];

                Object.defineProperty(data.newInstance, field.name, config);

                console.log("loop " + field.default);
                if (field.hasOwnProperty("default")) data.newInstance[field.name] = field.default;
            });

            return this.abort();
        });
    }
};
