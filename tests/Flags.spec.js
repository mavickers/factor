import Flags from "../src/base/classes/Flags";

describe("Flags", () => {
    it("should set and read single values properly", () => {
        class FlagOne extends Flags {
            static First;
            static Second;
            static Third;
        }

        let flags;

        expect(() => flags = new FlagOne("Second")).not.toThrow();

        expect(flags.equals("Second")).toEqual(true);
        expect(flags.equals("First")).toEqual(false);
        expect(flags.equals(FlagOne.Second)).toEqual(true);
        expect(flags.equals(FlagOne.First)).toEqual(false);
        expect(flags.equals(false)).toEqual(false);
        expect(flags.equals(true)).toEqual(false);
        expect(flags.equals()).toEqual(false);
        expect(flags.value).toEqual(FlagOne.Second);
        expect(flags.value).not.toEqual(FlagOne.First);
        expect(flags.value).not.toEqual("Second");

        expect(flags.hasAll("Second")).toEqual(true);
        expect(flags.hasAll(FlagOne.Second)).toEqual(true);
        expect(flags.hasAll("Second", "Third")).toEqual(false);
        expect(flags.hasAll(FlagOne.Second, FlagOne.Third)).toEqual(false);
        expect(flags.hasAll("Third")).toEqual(false);
        expect(flags.hasAll(FlagOne.Third)).toEqual(false);
        expect(flags.hasAll("First", "Second", "Third")).toEqual(false);
        expect(flags.hasAll(FlagOne.First, FlagOne.Second, FlagOne.Third)).toEqual(false);
        expect(flags.hasAll("First", "Third")).toEqual(false);
        expect(flags.hasAll(FlagOne.First, FlagOne.Third)).toEqual(false);
        expect(flags.hasAll()).toEqual(false);

        expect(flags.hasAny("Second")).toEqual(true);
        expect(flags.hasAny(FlagOne.Second)).toEqual(true);
        expect(flags.hasAny("Second", "Third")).toEqual(true);
        expect(flags.hasAny(FlagOne.Second, FlagOne.Third)).toEqual(true);
        expect(flags.hasAny("First")).toEqual(false);
        expect(flags.hasAny(FlagOne.First)).toEqual(false);
        expect(flags.hasAny("First", "Second", "Third")).toEqual(true);
        expect(flags.hasAny(FlagOne.First, FlagOne.Second, FlagOne.Third)).toEqual(true);
        expect(flags.hasAny("First", "Third")).toEqual(false);
        expect(flags.hasAny(FlagOne.First, FlagOne.Third)).toEqual(false);
        expect(flags.hasAny()).toEqual(false);
    });

    it("should set and read multiple values properly", () => {
        class FlagOne extends Flags {
            static First;
            static Second;
            static Third;
        }

        let flags;

        expect(() => flags = new FlagOne("Second", "Third")).not.toThrow();

        expect(flags.equals("Second")).toEqual(false);
        expect(flags.equals(FlagOne.Second)).toEqual(false);

        expect(flags.hasAll("Second")).toEqual(true);
        expect(flags.hasAll(FlagOne.Second)).toEqual(true);
        expect(flags.hasAll("Second", "Third")).toEqual(true);
        expect(flags.hasAll(FlagOne.Second, FlagOne.Third)).toEqual(true);
        expect(flags.hasAll("First")).toEqual(false);
        expect(flags.hasAll(FlagOne.First)).toEqual(false);
        expect(flags.hasAll("First", "Second", "Third")).toEqual(false);
        expect(flags.hasAll(FlagOne.First, FlagOne.Second, FlagOne.Third)).toEqual(false);
        expect(flags.hasAll("First", "Third")).toEqual(false);
        expect(flags.hasAll(FlagOne.First, FlagOne.Third)).toEqual(false);
        expect(flags.hasAll("test1")).toEqual(false);
        expect(flags.hasAll("test1", "test2")).toEqual(false);
        expect(flags.hasAll()).toEqual(false);

        expect(flags.hasAny("Second")).toEqual(true);
        expect(flags.hasAny(FlagOne.Second)).toEqual(true);
        expect(flags.hasAny("Second", "Third")).toEqual(true);
        expect(flags.hasAny(FlagOne.Second, FlagOne.Third)).toEqual(true);
        expect(flags.hasAny("First")).toEqual(false);
        expect(flags.hasAny(FlagOne.First)).toEqual(false);
        expect(flags.hasAny("First", "Second", "Third")).toEqual(true);
        expect(flags.hasAny(FlagOne.First, FlagOne.Second, FlagOne.Third)).toEqual(true);
        expect(flags.hasAny("First", "Third")).toEqual(true);
        expect(flags.hasAny(FlagOne.First, FlagOne.Third)).toEqual(true);
        expect(flags.hasAny("test1")).toEqual(false);
        expect(flags.hasAny("test1", "test2")).toEqual(false);
        expect(flags.hasAny()).toEqual(false);
    });

    it("should clear flags properly", () => {
        class FlagOne extends Flags {
            static First;
            static Second;
            static Third;
        }

        let flags;

        expect(() => flags = new FlagOne("First")).not.toThrow();
        expect(flags.equals("First")).toEqual(true);
        expect(flags.equals(FlagOne.First)).toEqual(true);
        expect(() => flags.clear()).not.toThrow();
        expect(flags.equals("First")).toEqual(false);
        expect(flags.equals(FlagOne.First)).toEqual(false);
        expect(flags.equals(0)).toEqual(false);
        expect(flags.equals()).toEqual(false);
        expect(flags.value).toEqual(0);

        expect(flags.hasAny("First")).toEqual(false);
        expect(flags.hasAll(FlagOne.First)).toEqual(false);
        expect(flags.hasAny("First", "Second")).toEqual(false);
        expect(flags.hasAll(FlagOne.First, FlagOne.Second)).toEqual(false);
    });
});
