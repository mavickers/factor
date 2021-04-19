import RandomGenerator from "./RandomGenerator";
import StandardModel_ConfigureInstance from "./StandardModel/ConfigureInstance";
import StandardModel_ConfigureModel from "./StandardModel/ConfigureModel";

export { RandomGenerator };

export default {
    RandomGenerator: RandomGenerator,
    StandardModel: {
        ConfigureInstance: StandardModel_ConfigureInstance,
        ConfigureModel: StandardModel_ConfigureModel
    }
};
