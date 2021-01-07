class Configurable {
    constructor(obj) {

    }

    static get configuration() {
        return this._config;
    }

    static configure(config) {
        if (this.hasOwnProperty("_config")) return false;

        Object.defineProperty(this, "_config", { get: () => config });

        return true;
    }
}
 export default Configurable;
