import Pipeline from "../../../../components/Pipeline/Pipeline";

import Initialize from "./InitializeFilter"
import SetBooleanField from "./SetBooleanFieldFilter";
import SetNumberField from "./SetNumberFieldFilter";
import SetStringField from "./SetStringFieldFilter"
import SetObjectField from "./SetObjectFieldFilter"
import Wrapup from "./WrapupFilter";

export default Pipeline.createWith(Initialize, SetBooleanField, SetNumberField, SetStringField, SetObjectField).finishWith(Wrapup);
