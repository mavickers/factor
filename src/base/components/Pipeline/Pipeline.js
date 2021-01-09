class Pipeline {
    filters = [];
    current = 0;

    constructor() {

    }

    add(filter) {
        this.filters.push(filter);
        return this;
    }

    count(filter) {
        return this.filters.length;
    }

    execute(input, next, callback) {
        callback = callback || function() {};
        next = next || function() { callback(null, input); };
        var self = this;
        function getNext() {
            if (self.current < self.count()) {
                return function(input, callback) {
                    var filter = self.filters[self.current++];
                    filter.execute(input, getNext(), callback);
                };
            }

            return next;
        }

        getNext()(input, callback);
    }

    executeSync(input, next) {
        var self = this;
        next = next || function() {};
        function getNext() {
            if (self.current < self.count()) {
                return function(input) {
                    return self.filters[self.current++].executeSync(input, getNext());
                };
            }

            return next;
        }

        return getNext()(input);
    }

    andFinally(done) {
        return this.add({
            execute: function(input, next, callback) {
                done(input, callback);
            },

            executeSync: function(input, next) {
                return done(input);
            }
        });
    }
}

export default Pipeline;
