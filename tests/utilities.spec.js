import Utilities from "../src/base/Utilities";
import * as Util from "util";

describe("Utilities", () => {
    it("should copy and seal an object", () => {
       const obj1 = { "one": 1 };
       let obj2;

       expect(() => obj2 = Utilities.copyAndSeal(obj1)).not.toThrow();
       expect(() => obj2.two = 2).toThrow();
       expect(() => obj2.one = "one").not.toThrow();
       expect(obj1.one).toEqual(1);
    });

    it("should identify classes properly", () => {
       class ParentClass {
           #childClass;
           constructor() { this.#childClass = Utilities.getChildClass(this); }
           get childClass() { return this.#childClass };
       };
       class ChildClass extends ParentClass { }

       let childClass;

       expect(() => childClass = new ChildClass()).not.toThrow();
       expect(Utilities.getChildClass(childClass)).toEqual(ChildClass);
       expect(Utilities.getChildClass(childClass)).toEqual(childClass.childClass);
       expect(Utilities.getChildClassName(childClass)).toEqual("ChildClass");
       expect(Utilities.getParentClass(childClass)).toEqual(ParentClass);
       expect(Utilities.getParentClassName(childClass)).toEqual("ParentClass");
    });

    it("should get parameter names correctly", () => {
        const fn1 = function (one, two, three) { };
        const fn2 = (four, five, six, seven) => null;
        function fn3(eight, nine, ten, eleven, /* test (hello) */ twelve) { };
        const fn4 = thirteen => null;
        const fn5 = function() { };

        let res1, res2, res3, res4, res5;

        expect(() => res1 = Utilities.getFuncParams(fn1)).not.toThrow();
        expect(() => res2 = Utilities.getFuncParams(fn2)).not.toThrow();
        expect(() => res3 = Utilities.getFuncParams(fn3)).not.toThrow();
        expect(() => res4 = Utilities.getFuncParams(fn4)).not.toThrow();
        expect(() => res5 = Utilities.getFuncParams(fn5)).not.toThrow();

        expect(res1).toBeInstanceOf(Array);
        expect(res2).toBeInstanceOf(Array);
        expect(res3).toBeInstanceOf(Array);
        expect(res4).toBeInstanceOf(Array);
        expect(res5).toBeInstanceOf(Array);

        expect(res1).toHaveLength(3);
        expect(res2).toHaveLength(4);
        expect(res3).toHaveLength(5);
        expect(res5).toHaveLength(0);

        expect(res1).toEqual([ "one", "two", "three" ]);
        expect(res2).toEqual([ "four", "five", "six", "seven" ]);
        expect(res3).toEqual([ "eight", "nine", "ten", "eleven", "twelve" ]);
        expect(res5).toEqual([ ]);
    });

    it("should identify arrays containing items of the same type", () => {
        class ClassOne { };
        class ClassTwo { };
        class ClassThree extends ClassOne { };
        function ClassFour() { };
        const ClassFive = function() { };
        const ClassSix = function() { return function() { }};

        const arr1 = [ "one", "two", "three" ];
        const arr2 = [ 1, 2, 3 ];
        const arr3 = [ new ClassOne(), new ClassOne() ];
        const arr4 = [ "one", 2, "three" ];
        const arr5 = [ new ClassOne(), new ClassTwo() ];
        const arr6 = [ new ClassOne, new ClassThree() ];
        const arr7 = [ new ClassFour() ];
        const arr8 = [ new ClassFive() ];
        const arr9 = [ new ClassSix() ];
        const arr10 = [ ClassThree, ClassFour, ClassFive, ClassSix ];

        expect(Utilities.isArrayOfType(arr1, "string")).toEqual(true);
        expect(Utilities.isArrayOfType(arr2, "number")).toEqual(true);
        expect(Utilities.isArrayOfType(arr3, ClassOne)).toEqual(true);
        expect(Utilities.isArrayOfType(arr3, "ClassOne")).toEqual(false);
        expect(Utilities.isArrayOfType(arr3, "object")).toEqual(true);
        expect(Utilities.isArrayOfType(arr4, "string")).toEqual(false);
        expect(Utilities.isArrayOfType(arr3, Object)).toEqual(true);
        expect(Utilities.isArrayOfType(arr3, Function)).toEqual(false);
        expect(Utilities.isArrayOfType(arr3, "function")).toEqual(false);
        expect(Utilities.isArrayOfType(arr5, ClassOne)).toEqual(false);
        expect(Utilities.isArrayOfType(arr6, ClassOne)).toEqual(true);
        expect(Utilities.isArrayOfType(arr6, ClassThree)).toEqual(false);
        expect(Utilities.isArrayOfType(arr7, ClassFour)).toEqual(true);
        expect(Utilities.isArrayOfType(arr7, "function")).toEqual(false);
        expect(Utilities.isArrayOfType(arr8, "function")).toEqual(false);
        expect(Utilities.isArrayOfType(arr9, Function)).toEqual(true);
        expect(Utilities.isArrayOfType(arr9, "function")).toEqual(true);
        expect(Utilities.isArrayOfType(arr10, Function)).toEqual(true);
        expect(Utilities.isArrayOfType(arr10, "function")).toEqual(true);
        expect(Utilities.isArrayOfType()).toEqual(false);
        expect(Utilities.isArrayOfType("test", "string")).toEqual(false);
        expect(Utilities.isArrayOfType(arr1)).toEqual(false);
        expect(Utilities.isArrayOfType(undefined, "string")).toEqual(false);
    });

    it("should determine if an object is a class", () => {
        class ClassOne { }
        class ClassTwo extends ClassOne { };
        function ClassThree() { };

        expect(Utilities.isClass(ClassOne)).toEqual(true);
        expect(Utilities.isClass(ClassTwo)).toEqual(true);
        expect(Utilities.isClass(ClassThree)).toEqual(false);
        expect(Utilities.isClass(new ClassOne())).toEqual(false);
        expect(Utilities.isClass(Object)).toEqual(true);
        expect(Utilities.isClass(String)).toEqual(true);
    })

    it("should determine if an object is a function", () => {
        const func1 = function() { };
        function func2() { };
        const func3 = () => null;
        class ClassOne { }

        expect(Utilities.isFunction(new Function())).toEqual(true);
        expect(Utilities.isFunction(function() { })).toEqual(true);
        expect(Utilities.isFunction(func1)).toEqual(true);
        expect(Utilities.isFunction(func2)).toEqual(true);
        expect(Utilities.isFunction(func3)).toEqual(true);
        expect(Utilities.isFunction(ClassOne)).toEqual(true);
        expect(Utilities.isFunction(new ClassOne())).toEqual(false);
    });

    it("should determine if an object is an object", () => {
        class ClassOne { };

        expect(Utilities.isObject({})).toEqual(true);
        expect(Utilities.isObject(new Object())).toEqual(true);
        expect(Utilities.isObject(Object)).toEqual(true);
        expect(Utilities.isObject(new String())).toEqual(true);
        expect(Utilities.isObject("string")).toEqual(false);
        expect(Utilities.isObject(1)).toEqual(false);
        expect(Utilities.isObject(true)).toEqual(false);
        expect(Utilities.isObject(Function)).toEqual(true);
        expect(Utilities.isObject(new Function())).toEqual(true);
        expect(Utilities.isObject(ClassOne)).toEqual(true);
        expect(Utilities.isObject(new ClassOne())).toEqual(true);
    });

    it("should determine if an object is a string", () => {
        expect(Utilities.isString("test")).toEqual(true);
        expect(Utilities.isString(new String())).toEqual(true);
        expect(Utilities.isString(String)).toEqual(false);
        expect(Utilities.isString("")).toEqual(true);
        expect(Utilities.isString()).toEqual(false);
    });
});
