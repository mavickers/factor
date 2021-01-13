import Classes from "../Classes";
import Configurable from "../interfaces/Configurable";
import Describable from "../interfaces/Describable";
import Mappable from "../interfaces/Mappable";
import Utilities from "../Utilities";

class StandardModel extends Classes([ Configurable, Describable, Mappable ]) {
    constructor(obj) {
        super(obj);
    }
}

export default StandardModel;
