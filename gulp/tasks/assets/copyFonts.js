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
    app.fn.tasks.defineTask(self, [], copyFonts);
};

/**
 * Copy fonts out of the assets folder
 * @param {fn} callback
 * @returns {*}
 */
function copyFonts(callback) {
    var assets = [
        app.fn.app.absolutePath(app.core.paths.src, app.config.paths.assets, app.config.paths.fonts, '**', '*')
    ];
    return gulp.src(assets)
        .pipe(gulp.dest(app.fn.app.absolutePath(app.core.paths.dist, app.config.paths.assets, app.config.paths.fonts)));
}
