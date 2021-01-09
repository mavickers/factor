import { Classes, Configurable } from "../../factor";
import { Describing, Mappable } from "../../factor";

class StandardModel extends Classes([ Configurable, Describing, Mappable ]) {
    constructor(obj) {
        super(obj);
    }
}

export default StandardModel;
