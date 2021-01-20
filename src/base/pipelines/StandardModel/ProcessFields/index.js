import Pipeline from "../../../components/Pipeline/Pipeline";

import Initialize from "./InitializeFilter"
import SetBooleanField from "./SetBooleanFieldFilter";
import SetDateField from "./SetDateFieldFilter";
import SetNumberField from "./SetNumberFieldFilter";
import SetStringField from "./SetStringFieldFilter"
import SetObjectField from "./SetObjectFieldFilter"
import Wrapup from "./WrapupFilter";

export default
    Pipeline
        .create()
        .filterWith(Initialize, SetBooleanField, SetDateField, SetNumberField)
        .filterWith(SetStringField, SetObjectField)
        .finishWith(Wrapup);
