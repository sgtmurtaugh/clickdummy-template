let typechecks = require('../../lib/typechecks');
let _ = require('lodash');

const PANINI_CONTEXT_PARAMETERS = ['_parent', 'column', 'data', 'end', 'hash', 'layout', 'line', 'loc',
    'lookupProperty', 'page', 'partial-block', 'root', 'start'];
// const CLICKDUMMY_PARAMETERS = ['hsize', 'vsize'];

/**
 * TODO
 * @param context
 * @param options
 * @returns {string}
 */
module.exports = function(context, options) {
    let attrs = [];
    let params = _.extend({});

    if (typechecks.isNotEmpty(context)) {
        params = _.extend(params, context);
    }

    if (typechecks.isNotEmpty(options)
            && typechecks.isNotEmpty(options.hash)) {
        params = _.extend(params, options.hash);
    }

    let paramKeys = Object.keys(params);
    _.each(paramKeys, function (paramKey) {
        if (!isPaniniContextParameter(paramKey)) {
            let paramValue = params[paramKey];

            if (typechecks.isNotEmpty(paramValue)
                    && !typechecks.isObject(paramValue)
                    && !typechecks.isFunction(paramValue)
                    && !typechecks.isJSONString(paramValue)) {

                attrs.push(paramKey + '="' + paramValue + '"');
            }
        }
    });

    return attrs.join(' ');
};

/**
 * TOODO
 * @param paramKey
 * @returns {boolean}
 */
function isPaniniContextParameter(paramKey) {
    let bIgnoreParam = true;

    if (typechecks.isNotEmpty(paramKey) && !PANINI_CONTEXT_PARAMETERS.includes(paramKey)) {
        bIgnoreParam = false;
    }
    return bIgnoreParam;
}
