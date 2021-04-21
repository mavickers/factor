/*  RandomGenerator.js
 *
 *  Pipeline that generates a random value for the various primitive
 *  or structured js types; each type has its own set of limits.
 *
 *  todo: add functionality that allows a custom set of limits when
 *        setting the pipeline up.
 */

import Pipeline from "../../components/Pipeline/Pipeline";

import InitializeFilter from "./InitializeFilter"
import ArrayFilter from "./ArrayFilter";
import BigIntFilter from "./BigIntFilter";
import BooleanFilter from "./BooleanFilter";
import DateFilter from "./DateFilter";
import FunctionFilter from "./FunctionFilter";
import MapFilter from "./MapFilter";
import NumberFilter from "./NumberFilter";
import ObjectFilter from "./ObjectFilter";
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
            ObjectFilter,
            SetFilter,
            StringFilter,
            SymbolFilter,
            WeakMapFilter,
            WeakSetFilter
        )
        .finishWith(WrapupFilter);
