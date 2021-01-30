import { Describable, Mixin, Utilities } from "../../../factor";

export default function(target, name, descriptor) {
    if (!Utilities.isClass(target)) return target;

    return Mixin(target, Describable);
}
