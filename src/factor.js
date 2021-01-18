import Classes from "./base/Classes";
import Configurable from "./base/interfaces/Configurable";
import Describable from "./base/interfaces/Describable";
import Mappable from "./base/interfaces/Mappable";
import StandardModel from "./base/classes/StandardModel";

import { Pipeline, PipelineArgs, PipelineFilter } from "./base/components/Pipeline";

import Enum from "./base/classes/Enum";
import Flags from "./base/classes/Flags";
import Mapper from "./base/classes/Mapper";
import MapperOptionsFlag from "./base/classes/MapperOptionsFlag";

import Utilities from "./base/Utilities";

import ConfigureModelPipeline from "./base/pipelines/ConfigureModelPipeline";

export {
    Classes,
    Configurable,
    Describable,
    Enum,
    Flags,
    Mappable,
    Mapper,
    MapperOptionsFlag,
    Pipeline,
    PipelineArgs,
    PipelineFilter,
    StandardModel,
    Utilities
};

export default {
    AutoModel: StandardModel,
    Classes,
    Configurable,
    Describing: Describable,
    Enum: Enum,
    Flags: Flags,
    Mappable: Mappable,
    Mapper: Mapper,
    MapperOptionsFlag: MapperOptionsFlag,
    Pipeline,
    PipelineArgs,
    PipelineFilter,
    StandardModel: StandardModel,
    Utilities: Utilities
};
