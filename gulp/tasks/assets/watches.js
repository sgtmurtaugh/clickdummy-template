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
    // assets
    // gulp.watches(app.fn.path.srcAssetsFolder(), copyAssets);
    gulp.watch(app.fn.path.srcAssetsFolder(), `assets${app.core.delimiters.tasks.subtasks}copy`);
    gulp.watch(app.fn.path.srcAssetsFolder('fonts'), `assets${app.core.delimiters.tasks.subtasks}copy`);
}
