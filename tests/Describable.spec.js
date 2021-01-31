import { describable } from "../src/base/classes/decorators";
import { Describable } from "../src/base/interfaces";
import cloneFn from "lodash.clonedeep";
import hashFn from "object-hash";

@describable
class Model1 { }
class Model2 extends Describable { }
class Model3 extends Describable { field1 = "test" }

let model1, model2, model3;

describe("Describable", () => {
    beforeEach(() => {
        model1 = null;
        model2 = null;
        model3 = null;
    });

    it("should instantiate properly", () => {
        expect(() => model1 = new Model1()).not.toThrow();
        expect(() => model2 = new Model2()).not.toThrow();

        expect(model1.className).toEqual("Model1");
        expect(model2.className).toEqual("Model2");
        expect(model1.clone instanceof Function).toEqual(true);
        expect(model2.clone instanceof Function).toEqual(true);
        expect(model1.differencesFrom instanceof Function).toEqual(true);
        expect(model2.differencesFrom instanceof Function).toEqual(true);
        expect(Model1.isArrayOfThis instanceof Function).toEqual(true);
        expect(Model2.isArrayOfThis instanceof Function).toEqual(true);
        expect(Model1.useCloneFunction instanceof Function).toEqual(true);
        expect(Model2.useCloneFunction instanceof Function).toEqual(true);
        expect(Model1.useHashFunction instanceof Function).toEqual(true);
        expect(Model2.useHashFunction instanceof Function).toEqual(true);

        expect(() => model1.clone()).toThrow();
        expect(() => model2.clone()).toThrow();
        expect(() => model1.hash).toThrow();
        expect(() => model2.hash).toThrow();
    });

    it("should clone objects properly", () => {
        let clone1, clone2, clone3;

        expect(()=> Model1.useCloneFunction()).toThrow();
        expect(()=> Model2.useCloneFunction()).toThrow();
        expect(()=> Model1.useCloneFunction("test")).toThrow();
        expect(()=> Model2.useCloneFunction("test")).toThrow();

        expect(() => model1 = new Model1()).not.toThrow();
        expect(() => model2 = new Model2()).not.toThrow();
        expect(() => model3 = new Model3()).not.toThrow();

        expect(() => model1.clone()).toThrow();
        expect(() => model2.clone()).toThrow();
        expect(() => model3.clone()).toThrow();

        expect(()=> Model1.useCloneFunction(cloneFn)).not.toThrow();
        expect(()=> Model2.useCloneFunction(cloneFn)).not.toThrow();
        expect(()=> Model3.useCloneFunction(cloneFn)).not.toThrow();

        expect(()=> clone1 = Model1.clone()).toThrow();
        expect(()=> clone2 = Model2.clone()).toThrow();
        expect(()=> clone1 = model1.clone()).not.toThrow();
        expect(()=> clone2 = model2.clone()).not.toThrow();
        expect(()=> clone3 = model3.clone()).not.toThrow();
        expect(clone1).toEqual(cloneFn(model1));
        expect(clone2).toEqual(cloneFn(model2));
        expect(clone1).toEqual(clone2);
        expect(clone1).not.toEqual(clone3);
    });
})
