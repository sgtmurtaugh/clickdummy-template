'use strict';

let gulp;
let plugins;
let app;

module.exports = function ( _gulp, _plugins, _app ) {
    gulp = _gulp;
    plugins = _plugins;
    app = _app;

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

            if (isNotEmpty(obj1)) {
                if (app.functions.typechecks.isArray(obj1)) {
                    mergedArray = mergedArray.concat(obj1);
                }
                else {
                    mergedArray.push(obj1);
                }
            }

            if (app.functions.typechecks.isNotEmpty(obj2)) {
                if (app.functions.typechecks.isArray(obj2)) {
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
