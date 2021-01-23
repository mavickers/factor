import Pipeline from "../../../components/Pipeline/Pipeline";

import Normalize from "../../Common/NormalizeDataParameters";
import Initialize from "./InitializeFilter";
import PropNamesLoop from "./PropNamesLoopFilter";
import SaveConfig from "./SaveConfigFilter";

export default Pipeline.createWith(Normalize, Initialize, PropNamesLoop, SaveConfig);
