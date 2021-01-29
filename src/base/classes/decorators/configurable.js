import { Configurable, Utilities } from "../../../factor";
import Classes from "../../Classes";

export default function(target, name, descriptor) {
    if (!Utilities.isClass(target)) return descriptor;
    if (target._inherited) return descriptor;

    target = Classes(target, Configurable);

    return target;
}
