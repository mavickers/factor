import Pipeline from "../../../components/Pipeline/Pipeline";
import InitializeFilter from "./InitializeFilter";
import LengthCheckFilter from "./LengthCheckFilter";
import FieldCheckFixedFilter from "./FieldCheckFixedFilter";
import FieldCheckVaryingFilter from "./FieldCheckVaryingFilter";
import WrapupFilter from "./Wrapup";

// todo: consider an option that will allow profiling based on the
//       value of the first argument; for instance:
//       getRandom(Number, 0, 100)
//       if the first value is Number then it looks for subsequent
//       integer values (which in this instance would be min/max
//       values).

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
