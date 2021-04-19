import { PipelineFilter } from "../../components/Pipeline";
import Globals from "../../Globals";

export default class InitializeFilter extends PipelineFilter {
    constructor() {
        super((data, logger) => {
            // the data arg should be a type; once confirmed we will
            // normalize the data parameter for the remaining filters.

            const newData = { };

            newData.allTypes = [ ...Globals.Primitives, ...Globals.Structurals ];
            newData.targetType = newData.allTypes.find(type => data[0] === type.type);
            newData.targetValue = undefined;

            // this will create a string using max of 64 digits
            // and then create a positive BigInt value from the result.
            newData.generateBigInt = () => {
                const numbers = [..."0123456789"];
                const digits = Math.floor(Math.random() * 64) + 1
                let numberString = "";

                while(numberString.length < digits) numberString += numbers[Math.floor(Math.random() * 10)];

                return BigInt(numberString);
            };

            newData.generateBoolean = () => Math.random() < 0.5;

            // generates a random date between 1/1/1900 and the current date
            newData.generateDate = () => {
                const start = new Date("1/1/1900");

                return new Date(start.getTime() + Math.random() * (Date.now() - start.getTime()));
            };

            // this will generate a number value less than a BigInt
            // with up to 10 decimal places and randomly positive or
            // negative.
            newData.generateNumber = () => Math.random() * (10 ** Math.floor(Math.random() * 10) + 1) * (Math.random() < 0.5 ? 1 : -1);

            // this will generate a random string value up to 64
            // characters long using 0-9a-z character.
            newData.generateString = () => [...Array(Math.floor(Math.random() * 64) + 1)].map(() => Math.random().toString(36)[2]).join("");

            // this will randomly generate a symbol; 25% of the time
            // the symbol should be completely random (no seed string)
            // while the rest of the time it uses the random string
            // generator to use as a base.
            newData.generateSymbol = () => Math.random () < .25 ? Symbol() : Symbol(newData.generateString());

            return newData.targetType ? newData : this.abort("Specified type invalid");
        });
    }
}
