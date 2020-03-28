'use strict';

// let typeChecks = require('./type-checks');

let gulp;
let plugins;
let app;

module.exports = function ( _gulp, _plugins, _app ) {
    gulp = _gulp;
    plugins = _plugins;
    app = _app;

    // Recursion breakOff object.
    let _requestedTasknames = [];

    return {

        /*
         * getMergedArray
         * @param obj1
         * @param obj2
         * @return {Array}
         * <p>TODO
         */
        'getMergedArray': function (obj1, obj2) {
            let mergedArray = [];

            if (typeChecks.isNotEmpty(obj1)) {
                if (typeChecks.isArray(obj1)) {
                    mergedArray = mergedArray.concat(obj1);
                }
                else {
                    mergedArray.push(obj1);
                }
            }

            if (typeChecks.isNotEmpty(obj2)) {
                if (typeChecks.isArray(obj2)) {
                    mergedArray = mergedArray.concat(obj2);
                }
                else {
                    mergedArray.push(obj2);
                }
            }

            return mergedArray;
        }
    }
};
