import Utilities from "../../Utilities";
import Mixin from "../Mixin";
import Mappable from "../../interfaces/Mappable";

export default function(target, name, descriptor) {
    if (!Utilities.isClass(target)) return target;

    return Mixin(target, Mappable)
}
