import { Pipeline } from "../../components/Pipeline";

import InitializeFilter from "./InitializeFilter"
import BigIntFilter from "./BigIntFilter";
import BooleanFilter from "./BooleanFilter";
import WrapupFilter from "./WrapupFilter";

export default
    Pipeline
        .create()
        .filterWith(InitializeFilter, BigIntFilter, BooleanFilter)
        .finishWith(WrapupFilter);
