'use strict';

let gulp;
let plugins;
let app;
let self;
let selfFolder;

module.exports = function ( _gulp, _plugins, _app ) {
    gulp = _gulp;
    plugins = _plugins;
    app = _app;
    self = app.fn.tasks.taskname(__filename);
    selfFolder = app.fn.tasks.subtasksFolder(__filename);

    // define Task function
    app.fn.tasks.defineTask(self, [], runServer);
};

/**
 * Start a server with BrowserSync to preview the site in
 * @param callback
 */
function runServer(callback) {
    browser.init({
        server: config.paths.dist.path,
        port: config.development.server.port
    });
    callback();
}

