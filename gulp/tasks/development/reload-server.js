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
    app.fn.tasks.defineTask(self, [], reloadServer);
};

/**
 * Reload the browser with BrowserSync
 * @param {fn} callback
 */
function reloadServer(callback) {
    if (app.fn.typechecks.isEmpty( app.instances.browserSync )) {
        app.logger.warning('browserSync instance not found. is the server running?');
    }
    else {
        app.logger.warning('initiate browserSync reload.');
        app.instances.browserSync.reload();
    }
    callback();
}

