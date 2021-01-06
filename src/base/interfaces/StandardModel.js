import { Classes } from "@/app/base";
import { Describing, Mappable } from "@/app/interfaces";

class StandardModel extends Classes([ Describing, Mappable ]) {
    constructor(obj) {
        super(obj);
    }
}

export default StandardModel;
