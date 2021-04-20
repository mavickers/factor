import Pipeline from "../../../components/Pipeline/Pipeline";
import InitializeFilter from "./InitializeFilter";

export default
    Pipeline
        .create()
        .filterWith(InitializeFilter)
        .finishWith();
