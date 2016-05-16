
((module) => {
    'use strict';

    class Promise extends require('extended-promise') {};

    var promise = Promise.resolve();

    var addPromise = (callback) =>
        promise.onfinish(() => promise = new Promise(callback));

    module.exports = {
        Promise,
        addPromise,
        get promise() {
            return promise;
        }
    };

})(module);
