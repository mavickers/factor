import Pipeline from "../../../components/Pipeline/Pipeline";
import InitializeFilter from "./InitializeFilter";
import LengthCheckFilter from "./LengthCheckFilter";
import FieldCheckFixedFilter from "./FieldCheckFixedFilter";
import FieldCheckVaryingFilter from "./FieldCheckVaryingFilter";
import WrapupFilter from "./Wrapup";

export default
    Pipeline
        .create()
        .filterWith(
            InitializeFilter,
            LengthCheckFilter,
            FieldCheckFixedFilter,
            FieldCheckVaryingFilter
        )
        .finishWith(WrapupFilter);
