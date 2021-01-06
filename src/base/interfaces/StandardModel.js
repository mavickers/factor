import { Classes } from "../../index";
import { Describing, Mappable } from "../../index";

class StandardModel extends Classes([ Describing, Mappable ]) {
    constructor(obj) {
        super(obj);
    }
}

export default StandardModel;
