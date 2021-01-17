import Utilities from "../src/base/Utilities";

describe("Utilities", () => {
    it("should copy and seal an object", () => {
       const obj1 = { "one": 1 };
       let obj2;

       expect(() => obj2 = Utilities.copyAndSeal(obj1)).not.toThrow();
       expect(() => obj2.two = 2).toThrow();
       expect(() => obj2.one = "one").not.toThrow();
       expect(obj1.one).toEqual(1);
    });

    it("should get parameter names correctly", () => {
        const fn1 = function (one, two, three) { };
        const fn2 = (four, five, six, seven) => null;
        function fn3(eight, nine, ten, eleven, /* test (hello) */ twelve) { };
        const fn4 = thirteen => null;

        let res1, res2, res3, res4;

        expect(() => res1 = Utilities.getFuncParams(fn1)).not.toThrow();
        expect(() => res2 = Utilities.getFuncParams(fn2)).not.toThrow();
        expect(() => res3 = Utilities.getFuncParams(fn3)).not.toThrow();
        expect(() => res4 = Utilities.getFuncParams(fn4)).not.toThrow();

        expect(res1).toBeInstanceOf(Array);
        expect(res2).toBeInstanceOf(Array);
        expect(res3).toBeInstanceOf(Array);
        expect(res4).toBeInstanceOf(Array);

        expect(res1).toHaveLength(3);
        expect(res2).toHaveLength(4);
        expect(res3).toHaveLength(5);
        expect(res4).toHaveLength(1);

        expect(res1).toEqual([ "one", "two", "three" ]);
        expect(res2).toEqual([ "four", "five", "six", "seven" ]);
        expect(res3).toEqual([ "eight", "nine", "ten", "eleven", "twelve" ]);
        expect(res4).toEqual([ "thirteen" ]);
    });
});
