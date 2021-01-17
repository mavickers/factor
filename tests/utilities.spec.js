import Utilities from "../src/base/Utilities";

describe("Utilities", () => {
   it("should get parameter names correctly", () => {
       const fn1 = function(one, two, three) { };
       const fn2 = (four, five, six, seven) => null;
       function fn3(eight, nine, ten, eleven, twelve) { };

       let res1, res2, res3;

       expect(() => res1 = Utilities.getFuncParams(fn1)).not.toThrow();
       expect(() => res2 = Utilities.getFuncParams(fn2)).not.toThrow();
       expect(() => res3 = Utilities.getFuncParams(fn3)).not.toThrow();

       expect(res1).toBeInstanceOf(Array);
       expect(res2).toBeInstanceOf(Array);
       expect(res3).toBeInstanceOf(Array);

       expect(res1).toHaveLength(3);
       expect(res2).toHaveLength(4);
       expect(res3).toHaveLength(5);

       expect(res1).toEqual(["one", "two", "three"]);
       expect(res2).toEqual(["four", "five", "six", "seven"]);
       expect(res3).toEqual(["eight", "nine", "ten", "eleven", "twelve"]);
   });
});
