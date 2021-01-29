import { Configurable, Utilities } from "../../../factor";
import Classes from "../../Classes";
import configurable from "../mixins/configurable";

export default function(target, name, descriptor) {
    if (!Utilities.isClass(target)) return target;

    return configurable(target);
}
