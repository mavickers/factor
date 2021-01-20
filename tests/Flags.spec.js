import Flags from "../src/base/classes/Flags";

describe("Flags", () => {
   it("should set and read values properly", () => {
       class FlagOne extends Flags {
           static First;
           static Second;
           static Third;
       }

       let flags;

       expect(() => flags = new FlagOne("Second")).not.toThrow();
       expect(flags.hasAll("Second")).toEqual(true);
       expect(flags.hasAny("Second")).toEqual(true);
       expect(flags.equals("Second")).toEqual(true);
       expect(flags.equals("First")).toEqual(false);
       expect(flags.hasAll(FlagOne.Second)).toEqual(true);
       expect(flags.hasAny(FlagOne.Second)).toEqual(true);
       expect(flags.equals(FlagOne.Second)).toEqual(true);
       expect(flags.equals(FlagOne.First)).toEqual(false);
   });
});
