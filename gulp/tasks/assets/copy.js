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
        "src/assets/**/*",
        "!src/assets/img{,/**}",
        "!src/assets/js{,/**}",
        "!src/assets/scss{,/**}"
    ]).pipe(gulp.dest(
        app.const.paths.dist + '/' + config.paths.dist.assets
    ));
}
