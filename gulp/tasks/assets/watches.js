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
    app.fn.tasks.defineTask(self, [], watches);
};

/**
 * Watch for changes to assets
 */
function watches(callback) {
    // Main Assets watch
    const copyTask = require('./copy');

    if ( app.fn.typechecks.isNotEmpty(copyTask.srcPaths) ) {
        gulp.watch(copyTask.srcPaths, gulp.series(`assets${app.config.delimiters.tasks.subtasks}copy`));
    }

    // Fonts watch
    const copyFontsTask = require('./copyFonts');

    if ( app.fn.typechecks.isNotEmpty(copyFontsTask.srcPaths) ) {
        gulp.watch(copyFontsTask.srcPaths, gulp.series(`assets${app.config.delimiters.tasks.subtasks}copyFonts`));
    }

    callback();
}
