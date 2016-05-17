
((module) => {
    'use strict';

    class Promise extends require('extended-promise') {};

    var promise = Promise.resolve();

    var addPromise = (callback) =>
        promise = promise.listener((_, ...decide) => callback(...decide));

    module.exports = {
        Promise,
        addPromise,
        get promise() {
            return promise;
        }
    };

})(module);
