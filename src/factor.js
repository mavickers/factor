import Classes from "./base/Classes";
import Configurable from "./base/interfaces/Configurable";
import Describing from "./base/interfaces/Describing";
import Mappable from "./base/interfaces/Mappable";
import StandardModel from "./base/interfaces/StandardModel";

import AutoModel from "./base/interfaces/AutoModel";
import Enum from "./base/interfaces/Enum";
import Flags from "./base/interfaces/Flags";
import Mapper from "./base/classes/Mapper";
import MapperOptionsFlag from "./base/classes/MapperOptionsFlag";
import Utilities from "./base/Utilities";

export {
    AutoModel,
    Classes,
    Configurable,
    Describing,
    Enum,
    Flags,
    Mappable,
    Mapper,
    MapperOptionsFlag,
    StandardModel,
    Utilities
};

export default {
    AutoModel,
    Classes,
    Configurable,
    Describing: Describing,
    Enum: Enum,
    Flags: Flags,
    Mappable: Mappable,
    Mapper: Mapper,
    MapperOptionsFlag: MapperOptionsFlag,
    StandardModel: StandardModel,
    Utilities: Utilities
};
