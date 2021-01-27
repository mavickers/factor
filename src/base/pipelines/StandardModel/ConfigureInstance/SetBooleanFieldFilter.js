import PipelineFilter from "../../../components/Pipeline/PipelineFilter";
import Utilities from "../../../Utilities";
import TypeMismatchSetOptions from "../../../classes/flags/TypeMismatchSetOptions";

export default class SetBooleanFieldFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            logger.log("SetBooleanFieldFilter");

            if (!data) return this.abort("data parameter is invalid");

            const { propNames, fieldDefs } = data.config;
            const { is } = Utilities;
            const fields = fieldDefs.filter(field => field.type === Boolean);

            if (fields.length === 0) return;

            const setter = function(field) { return function(value) {
                if (!field) throw new Error("setter received invalid 'field' parameter");
                if (Utilities.isBoolean(value)) { data.fieldVals[field.name] = value; return; }

                const typeMismatch = field.onTypeMismatch || data.config.onTypeMismatch || new TypeMismatchSetOptions("Noop");

                if (typeMismatch.equals("Ignore")) { data.fieldVals[field.name] = value; return; }
                if (typeMismatch.equals("Noop")) { data.fieldVals[field.name] = data.fieldVals[field.name]; return; }
                if (typeMismatch.equals("Null")) { data.fieldVals[field.name] = null; }
                if (typeMismatch.equals("Throw")) throw new Error(`type mismatch attempting to set value on ${ field.name }`);
            }};

            fields.forEach(field => {
                logger.log("forEach");

                const config = {
                    enumerable: true,
                    get:() => data.fieldVals[field.name] || false,
                    set:!field.readonly && setter(field)
                };

                delete data.newInstance["boolField"];

                Object.defineProperty(data.newInstance, field.name, config);

                if (field.hasOwnProperty("default")) data.newInstance[field.name] = field.default;
            });

            return this.abort();
        });
    }
};
