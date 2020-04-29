'use strict';

let gulp;
let plugins;
let app;

module.exports = function (_gulp, _plugins, _app) {
    gulp =_gulp;
    plugins = _plugins;
    app = _app;

    return {
        'typechecks' : require('./typechecks')(gulp, plugins, app),
        'log' : require('./log-utils')(gulp, plugins, app),
        'path' : require('./path-utils')(gulp, plugins, app),
        'app' : require('./app-utils')(gulp, plugins, app),
        'messages' : require('./messages')(gulp, plugins, app),
        'env' : require('./environment-utils')(gulp, plugins, app),
        'json' : require('./json-utils')(gulp, plugins, app),
        'tasks' : require('./task-utils')(gulp, plugins, app),
    };
};
