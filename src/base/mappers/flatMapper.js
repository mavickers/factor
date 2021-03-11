import Mapper from "../classes/Mapper";
import Utilities from "../Utilities";

const single = (data, index, array, ancillaryData) => {
    if (!(data && data instanceof Object)) return null;
    if (!Utilities.isClass(ancillaryData.constructor)) return null;
}

export default new Mapper(single);
