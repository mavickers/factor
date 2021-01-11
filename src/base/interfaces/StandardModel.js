import Classes from "../Classes";
import Configurable from "../interfaces/Configurable";
import Describing from "../interfaces/Describing";
import Mappable from "../interfaces/Mappable";

class StandardModel extends Classes([ Configurable, Describing, Mappable ]) {
    constructor(obj) {
        super(obj);
    }
}

export default StandardModel;
