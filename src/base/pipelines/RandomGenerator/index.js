import { Pipeline } from "../../components/Pipeline";

import InitializeFilter from "./InitializeFilter"
import ArrayFilter from "./ArrayFilter";
import BigIntFilter from "./BigIntFilter";
import BooleanFilter from "./BooleanFilter";
import DateFilter from "./DateFilter";
import FunctionFilter from "./FunctionFilter";
import MapFilter from "./MapFilter";
import NumberFilter from "./NumberFilter";
import SetFilter from "./SetFilter";
import StringFilter from "./StringFilter";
import SymbolFilter from "./SymbolFilter";
import WeakMapFilter from "./WeakMapFilter";
import WeakSetFilter from "./WeakSetFilter";
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
            SetFilter,
            StringFilter,
            SymbolFilter,
            WeakMapFilter,
            WeakSetFilter
        )
        .finishWith(WrapupFilter);
