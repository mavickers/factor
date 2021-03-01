import "jest-extended";
import Utilities from "../../src/base/Utilities";
import Flags from "../../src/base/classes/Flags";
import Logger from "../../src/base/components/Logger/Logger";
import Mixin from "../../src/base/classes/Mixin";
import TypeMismatchSetOptions from "../../src/base/classes/flags/TypeMismatchSetOptions";

const logger = new Logger();

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
           constructor() { this.#childClass = Utilities.getClass(this); }
           get childClass() { return this.#childClass };
       };
       class ChildClass extends ParentClass { }

       let childClass;

       expect(() => childClass = new ChildClass()).not.toThrow();
       expect(Utilities.getClass(childClass)).toEqual(ChildClass);
       expect(Utilities.getClass(childClass)).toEqual(childClass.childClass);
       expect(Utilities.getClassName(childClass)).toEqual("ChildClass");
       expect(Utilities.getParentClass(childClass)).toEqual(ParentClass);
       expect(Utilities.getParentClassName(childClass)).toEqual("ParentClass");
    });

    it("should get parameter names correctly", () => {
        const fn1 = function (one, two, three) { };
        const fn2 = (four, five, six, seven) => null;
        function fn3(eight, nine, ten, eleven, /* test (hello) */ twelve) { };
        const fn4 = thirteen => null;
        const fn5 = function() { };
        const fn6 = function(first = "1", second = "2", third, fourth = "4") { };

        let res1, res2, res3, res4, res5, res6;

        expect(() => res1 = Utilities.getFuncParams(fn1)).not.toThrow();
        expect(() => res2 = Utilities.getFuncParams(fn2)).not.toThrow();
        expect(() => res3 = Utilities.getFuncParams(fn3)).not.toThrow();
        expect(() => res4 = Utilities.getFuncParams(fn4)).not.toThrow();
        expect(() => res5 = Utilities.getFuncParams(fn5)).not.toThrow();
        expect(() => res6 = Utilities.getFuncParams(fn6)).not.toThrow();

        expect(res1).toBeInstanceOf(Array);
        expect(res2).toBeInstanceOf(Array);
        expect(res3).toBeInstanceOf(Array);
        expect(res4).toBeInstanceOf(Array);
        expect(res5).toBeInstanceOf(Array);
        expect(res6).toBeInstanceOf(Array);

        expect(res1).toHaveLength(3);
        expect(res2).toHaveLength(4);
        expect(res3).toHaveLength(5);
        expect(res4).toHaveLength(1);
        expect(res5).toHaveLength(0);
        expect(res6).toHaveLength(4);

        expect(res1).toEqual([ "one", "two", "three" ]);
        expect(res2).toEqual([ "four", "five", "six", "seven" ]);
        expect(res3).toEqual([ "eight", "nine", "ten", "eleven", "twelve" ]);
        expect(res4).toEqual([ "thirteen" ]);
        expect(res5).toEqual([ ]);
        expect(res6).toEqual([ "first", "second", "third", "fourth" ]);
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
    });

    it("should determine if an object is a date", () => {
        expect(Utilities.isDate(new Date())).toEqual(true);
        expect(Utilities.isDate(Date.now())).toEqual(false);
        expect(Utilities.isDate(new Date(Date.now()))).toEqual(true);
        expect(Utilities.isDate(new Date("test"))).toEqual(true);
        expect(Utilities.isDate("1/1/2000")).toEqual(false);
    });

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

    it("should determine if an object is a number", () => {
       expect(Utilities.isNumber(1)).toEqual(true);
       expect(Utilities.isNumber("1")).toEqual(false);
       expect(Utilities.isNumber(1.0)).toEqual(true);
       expect(Utilities.isNumber(NaN)).toEqual(false);
       expect(Utilities.isNumber(new Number())).toEqual(true);
    });

    it("should merge objects properly", () => {
        const obj1 = { one: "1", two: "2" };
        const obj2 = { three: "3", four: "4" };
        const obj3 = Utilities.merge(obj1, obj2);

        expect(Object.keys(obj3)).toHaveLength(4);

        const obj4 = { one: "1", two: { first: "1", second: "2", thrice: "2" }, three: { first: "1", second: "2", third: { first: "1" } } };
        const obj5 = { one: "2", two: { first: "1", second: "second" }, three: { third: { second: { first: "1", second: "2" } }, fourth: "4", fifth: "5" } };
        const obj6 = Utilities.merge(obj4, obj5);

        expect(Object.keys(obj6)).toHaveLength(3);
        expect(Object.keys(obj6.one)).toHaveLength(1);
        expect(Object.keys(obj6.two)).toHaveLength(3);
        expect(Object.keys(obj6.three)).toHaveLength(5);

        expect(obj6.one).toEqual("2");
        expect(obj6.two).toEqual({ first: "1", second: "second", thrice: "2" });
        expect(obj6.three).toEqual({ first: "1", second: "2", third: { first: "1", second: { first: "1", second: "2" } }, fourth: "4", fifth: "5" } );
    });

    it("should preserve prototypes when merging objects", () => {
        class TestFlag extends Flags {
            static First;
            static Second;
            static Third;
        }

        const testFlag = new TestFlag().set(TestFlag.Third);

        const obj1 = { one: "1", two: "2" };
        const obj2 = { three: "3", four: "4", fifth: testFlag };
        const obj3 = Utilities.merge(obj1, obj2);

        expect(Object.keys(obj3)).toHaveLength(5);
        expect(Object.getPrototypeOf(obj3.fifth).constructor.name).toEqual("TestFlag");
        expect(Object.getPrototypeOf(obj3.fifth.constructor).name).toEqual("Flags");

        const obj4 = { one: "1", two: { first: "1", second: "2" }, three: { first: "1", second: "2", third: { first: "1" } } };
        const obj5 = { one: "2", two: { first: "1", second: "second", third: "2" }, three: { third: { second: { first: "1", second: "2", third: { first: testFlag } } }, fourth: "4", fifth: "5" } };
        const obj6 = Utilities.merge(obj4, obj5);

        expect(Object.keys(obj6)).toHaveLength(3);
        expect(Object.getPrototypeOf(obj6.three.third.second.third.first).constructor.name).toEqual("TestFlag");
        expect(Object.getPrototypeOf(obj6.three.third.second.third.first.constructor).name).toEqual("Flags");
    });

    it("should determine if objects are of a specific type properly", () => {
        const Class1 = class { };
        const mismatchFlag = new TypeMismatchSetOptions("Ignore");

        expect(Utilities.isType(true, Boolean)).toBeTrue();
        expect(Utilities.isType(true, "boolean")).toBeTrue();
        expect(Utilities.isType("test", String)).toBeTrue();
        expect(Utilities.isType("test", "string")).toBeTrue();
        expect(Utilities.isType(1, Number)).toBeTrue();
        expect(Utilities.isType(1, "number")).toBeTrue();
        expect(Utilities.isType(Mixin.configId, Symbol)).toBeTrue();
        expect(Utilities.isType(Mixin.configId, "symbol")).toBeTrue();
        expect(Utilities.isType(new Class1(), Class1)).toBeTrue();
        expect(Utilities.isType(new Class1(), Function)).toBeFalse();
        expect(Utilities.isType(new Class1(), Object)).toBeTrue();

        expect(Utilities.isType(mismatchFlag, TypeMismatchSetOptions)).toBeTrue();
    });

    it ("should determine if an array contains all items of another array", () => {
        expect(Utilities.hasAll([1, 2, 3, 4, 5], [2, 3, 4])).toBeTrue();
        expect(Utilities.hasAll([1, 2, 3, 4, 5], [4, 5, 6])).toBeFalse();
        expect(Utilities.hasAll([], [])).toBeTrue();
        expect(Utilities.hasAll([1], [])).toBeTrue();
        expect(Utilities.hasAll([], [1])).toBeFalse();
    })
});
