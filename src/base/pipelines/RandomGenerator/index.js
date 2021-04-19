import { Pipeline } from "../../components/Pipeline";

import InitializeFilter from "./InitializeFilter"
import BigIntFilter from "./BigIntFilter";
import BooleanFilter from "./BooleanFilter";
import NumberFilter from "./NumberFilter";
import StringFilter from "./StringFilter";
import SymbolFilter from "./SymbolFilter";
import WrapupFilter from "./WrapupFilter";

export default
    Pipeline
        .create()
        .filterWith(InitializeFilter, BigIntFilter, BooleanFilter)
        .filterWith(NumberFilter, StringFilter, SymbolFilter)
        .finishWith(WrapupFilter);
