import Flags from "../Flags";

class TypeMismatchSetOptions extends Flags {
    // Default does not do anything currently
    static Default;
    static Ignore;
    static Throw;
    static Noop;
    static Null;
    // todo: think about how to implement Coerce option
    // static Coerce;
}

export default TypeMismatchSetOptions;
