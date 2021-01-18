import Pipeline from "../../../components/Pipeline/Pipeline";

import Initialize from "./InitializeFilter";
import PropNamesLoop from "./PropNamesLoopFilter";
import SaveConfig from "./SaveConfigFilter";

export default Pipeline.createWith(Initialize, PropNamesLoop, SaveConfig);
