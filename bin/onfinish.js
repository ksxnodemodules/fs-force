
((module) => {
    'use strict';

    var process = require('process');

    module.exports = (action) => (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log(`${action} ${info.path} successfully`);
        }
    };

})(module);
