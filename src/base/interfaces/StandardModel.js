import { Classes } from "../../factor";
import { Describing, Mappable } from "../../factor";

class StandardModel extends Classes([ Describing, Mappable ]) {
    constructor(obj) {
        super(obj);
    }
}

export default StandardModel;
