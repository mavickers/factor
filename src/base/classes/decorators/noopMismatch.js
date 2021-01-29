import FieldDescriptor from "../FieldDescriptor";
import TypeMismatchSetOptions from "../flags/TypeMismatchSetOptions";
import { Utilities } from "../../../factor";

export default (target, name, descriptor) => {
    // const newDescriptor = new FieldDescriptor(descriptor);

    // if (Utilities.isClass(target))

    // newDescriptor.configure("onTypeMismatch", new TypeMismatchSetOptions(TypeMismatchSetOptions.Noop));

    // return newDescriptor;


    return descriptor;
}
