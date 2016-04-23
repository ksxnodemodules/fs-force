
((module) => {
    'use strict';

    var stract = require('fs-force-action-as-string');

    module.exports = (action) => console.log(stract(action));

})(module);
