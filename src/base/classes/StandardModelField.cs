class StandardModelField {
    static new(arg) {
        if (!arg) return null;
        if (!(arg["type"] || (typeof arg["type"] == "function" || arg["type"] instanceof Function)) {
            console.warning("StandardModelField.new(): 'type' property in arguments missing or invalid");
            return null;
        }


        const config = { };

        if !
    }
}

export default StandardModelField;
