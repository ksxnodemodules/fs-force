
((module) => {
    'use strict';

    var process = require('process');

    const EXIT_SUCCESS = 0;
    const EXIT_FAILURE = 1;

    module.exports = (action) => (error, info) => {
        if (error) {
            console.error(error);
            process.exit(EXIT_FAILURE);
        } else {
            console.log(`${action} ${info.path} successfully`);
            process.exit(EXIT_SUCCESS);
        }
    };

})(module);
