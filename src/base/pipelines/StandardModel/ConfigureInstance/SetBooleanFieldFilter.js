import PipelineFilter from "../../../components/Pipeline/PipelineFilter";
import Utilities from "../../../Utilities";

export default class SetBooleanFieldFilter extends PipelineFilter {
    constructor() {
        super((data) => {
            if (!data) return this.abort("data parameter is invalid");

            const { propNames, fieldDefs } = data.config;
            const fields = fieldDefs.filter(field => field.type === Boolean);

            if (fields.length == 0) return;

            console.log("set boolean");
            data.newInstance.boolField = false;

            fields.forEach(field => {
                const getter = { get: () => data.fieldVals[field.name] };
                const setter = { set: (value) => {
                        console.log("setter");
                        console.log(Utilities.isBoolean(value));
                        data.fieldVals[field.name] = Utilities.isBoolean(value)
                            ? value :
                            data.typeMismatchHandler
                        console.log(field.name);
                    }};

                console.log(field.name);
                delete data.newInstance["boolField"];

                Object.defineProperty(data.newInstance, field.name, { ...getter, ...(!field.readonly && setter) });
            });

            return this.abort();

            // todo: this stuff will need to move into each of the filters - search through
            //       configuration.fieldDefs for matching types and process accordingly

            // data.fieldDef = data.config?.fieldDefs?.[data.propName] ?? null;
            // data.fieldValDefault = data.fieldDef.default || (data.fieldDef.type === Boolean ? false : null);
            // data.readOnly = (data.fieldDef?.readOnly ?? false) || false;
            // data.fieldVals = { };
            //
            //
        });
    }
};
