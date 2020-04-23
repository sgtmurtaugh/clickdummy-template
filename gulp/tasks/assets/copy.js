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
    app.fn.tasks.defineTask(self, [], copyAssets);
};

/**
 * Copy files out of the assets folder
 * This task skips over the "img", "js", "scss" and "fonts" folders, which are handled separately
 * @param {fn} callback
 * @returns {*}
 */
function copyAssets(callback) {
    return gulp.src([
        app.fn.path.srcAssetsFolder('**', '*'),
        `!${app.fn.path.srcAssetsFolder(app.config.paths.fonts)}{,${app.modules.path.sep}**}`,
        `!${app.fn.path.srcAssetsFolder(app.config.paths.images)}{,${app.modules.path.sep}**}`,
        `!${app.fn.path.srcAssetsFolder(app.config.paths.javascript)}{,${app.modules.path.sep}**}`,
        `!${app.fn.path.srcAssetsFolder(app.config.paths.scss)}{,${app.modules.path.sep}**}`
        // "src/assets/**/*",
        // "!src/assets/img{,/**}",
        // "!src/assets/js{,/**}",
        // "!src/assets/scss{,/**}"
    ]).pipe(gulp.dest(
        app.fn.path.distAssetsFolder()
    ));
}
