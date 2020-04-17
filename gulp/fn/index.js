'use strict';

let gulp;
let plugins;
let app;

module.exports = function (_gulp, _plugins, _app) {
    gulp =_gulp;
    plugins = _plugins;
    app = _app;

    return {
        '___config' : require('./config-utils')(gulp, plugins, app),
        '___helper' : require('./helper-utils')(gulp, plugins, app),
        'typechecks' : require('./typechecks')(gulp, plugins, app),
        'log' : require('./log-utils')(gulp, plugins, app),
        'messages' : require('./messages')(gulp, plugins, app),
        'json' : require('./json-utils')(gulp, plugins, app),
        'tasks' : require('./task-utils')(gulp, plugins, app),
    };
};
