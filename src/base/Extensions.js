if (!('toJSON' in Error.prototype)) {
    Object.defineProperty(Error.prototype, 'toJSON', {
        value: function() { return {
            message: this.message,
            stack: this.stack.split("\n").map(s => s.trim()).filter(s => s.startsWith("at "))
        }},
        configurable: true,
        writable: true
    });
}
