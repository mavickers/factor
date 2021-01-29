import { Configurable, Utilities } from "../../../factor";
import Mixin from "../Mixin";

export default function(target, name, descriptor) {
    if (!Utilities.isClass(target)) return target;

    return Mixin(target, Configurable);
}
