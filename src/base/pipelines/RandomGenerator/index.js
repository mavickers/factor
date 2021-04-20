import { Pipeline } from "../../components/Pipeline";

import InitializeFilter from "./InitializeFilter"
import ArrayFilter from "./ArrayFilter";
import BigIntFilter from "./BigIntFilter";
import BooleanFilter from "./BooleanFilter";
import DateFilter from "./DateFilter";
import FunctionFilter from "./FunctionFilter";
import MapFilter from "./MapFilter";
import NumberFilter from "./NumberFilter";
import StringFilter from "./StringFilter";
import SymbolFilter from "./SymbolFilter";
import WrapupFilter from "./WrapupFilter";

export default
    Pipeline
        .create()
        .filterWith(
            InitializeFilter,
            ArrayFilter,
            BigIntFilter,
            BooleanFilter,
            DateFilter,
            FunctionFilter,
            MapFilter,
            NumberFilter,
            StringFilter,
            SymbolFilter
        )
        .finishWith(WrapupFilter);
