import Pipeline from "../../../components/Pipeline/Pipeline";

import Normalize from "../../Common/NormalizeDataParametersFilter";
import Initialize from "./InitializeFilter";
import PropNamesLoop from "./PropNamesLoopFilter";
import SaveConfig from "./SaveConfigFilter";
import Wrapup from "./WrapupFilter";

export default Pipeline.createWith(Normalize, Initialize, PropNamesLoop, SaveConfig).finishWith(Wrapup);
