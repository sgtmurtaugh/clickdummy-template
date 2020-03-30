'use strict';

let fs = require('fs');
let requireDir = require('require-dir');

let gulp;
let plugins;
let app;

module.exports = function (_gulp, _plugins, _app) {
    gulp =_gulp;
    plugins = _plugins;
    app = _app;

    // add frequently used npm modules
    app.modules['fs'] = fs;
    app.modules['requireDir'] = requireDir;

    return {
        'typeChecks' : require('./type-checks')(gulp, plugins, app),
        'config' : require('./config-utils')(gulp, plugins, app),
        'messages' : require('./messages')(gulp, plugins, app),
        'helper' : require('./helper-utils')(gulp, plugins, app),
        'npm' : require('./npm-utils')(gulp, plugins, app),
        'json' : require('./json-utils')(gulp, plugins, app),
        'log' : require('./log-utils')(gulp, plugins, app),
        // 'tasks' : require('./task-utils')(gulp, plugins, app),
        'tasks' : require('./new-task-utils')(gulp, plugins, app),
    };
};
