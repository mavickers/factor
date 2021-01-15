import PipelineFilter from "./PipelineFilter";
import PipelineArgs from "./PipelineArgs";

const execute = function(filter, input, next, callback) {
    const isAsync = typeof callback === "function" || callback instanceof Function;
    const callbackFn = isAsync ? callback : function() { };
    const nextFn = isAsync
        ? next || function() { callbackFn(null, input) }
        : next || function() { };
    const nextArgs = isAsync ? [ input, callbackFn ] : [ input ];

//    if ()

    (function() {

    })()(...nextArgs);
}


class Pipeline {
    #arguments;
    #filters = [];
    #current = 0;

    constructor(...args) {
        this.withFilters(...args);

        return this;
    }

    withArgs = function(pipelineArgs) {
        if (!(pipelineArgs instanceof PipelineArgs)) throw Error("Pipeline.withArgs(): 'pipelineArgs' parameters is invalid");
        if (!pipelineArgs.data) pipelineArgs.data = { };
        if (!pipelineArgs.meta) pipelineArgs.meta = { abort: false, filters: [ ] };
    }

    withFilters = function(...filters) {
        filters.forEach(filter => filter instanceof PipelineFilter && this.#filters.push(filter));
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
