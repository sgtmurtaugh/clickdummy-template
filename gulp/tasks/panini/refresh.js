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
    app.fn.tasks.defineTask(self, [], refresh);
};

/**
 * Load updated HTML templates and partials into Panini
 * @param {fn} callback
 */
function refresh(callback) {
    if (null === app.instances.panini) {
        app.logger.log('panini instance not found. perhaps the build task was not called. try to start it.')
        gulp.start( 'panini :: build' );
    }

    if (null === app.instances.panini) {
        app.logger.warning('panini instance still not found.');
    }
    else {
        app.logger.warning('initiate panini refresh.');
        app.instances.panini.refresh();
    }
    callback();
}