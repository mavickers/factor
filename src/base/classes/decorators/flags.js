import Utilities from "../../Utilities";
import Flags from "../Flags";
import Mixin from "../Mixin";

export default function(target, name, descriptor) {
    if (!Utilities.isClass(target)) return target;

    return Mixin(target, Flags);
}
