import Configurable from "../../interfaces/Configurable";
import Mixin from "../Mixin";
import Utilities from "../../Utilities";

export default function(target, name, descriptor) {
    // if (!Utilities.isClass(target)) return target;

    return Mixin(target, Configurable);
}
