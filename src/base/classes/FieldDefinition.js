import Utilities from "../Utilities";
import TypeMismatchSetOptions from "./flags/TypeMismatchSetOptions";

export default class FieldDefinition {
    name;
    type;
    required;
    readonly;
    default;
    onTypeMismatch;

    constructor(args) {
        this.name = args.name || null;
        this.type = Utilities.isClass(args.type) ? args.type : null;
        this.required = Utilities.isBoolean(args.required) ? args.required : false;
        this.readonly = Utilities.isBoolean(args.readonly) ? args.readonly : false;
        this.default = Utilities.isType(args.default, this.type) ? args.default : null;
        this.onTypeMismatch =
            Utilities.isType(args.onTypeMismatch, TypeMismatchSetOptions) &&
            args.onTypeMismatch ||
            new TypeMismatchSetOptions("Ignore");
    }
}
