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

    // Delare const variable for assets paths
    _initAndExportSrcPaths();

    // define Task function
    app.fn.tasks.defineTask(self, [], copyFonts);
};

/**
 * initializes an string array with all path in- and exludes for this copy task. the definition is exported for e.g.
 * the watch-task
 * @returns {(string)[]}
 * @private
 */
function _initAndExportSrcPaths() {
    return module.exports.srcPaths = [
        app.fn.path.srcAssetsFolder(app.config.paths.fonts)
        // app.fn.path.srcAssetsFolder(app.config.paths.fonts, '**')
        // app.fn.path.srcAssetsFolder(app.config.paths.fonts, '**', '*')
    ];
}
/**
 * Copy fonts out of the assets folder
 * @param {fn} callback
 * @returns {*}
 */
function copyFonts(callback) {
    return gulp.src(module.exports.srcPaths)
        .pipe(gulp.dest(
            app.fn.path.distAssetsFolder(app.config.paths.fonts)
        )
    );
// TODO: use fileSync instead!
    // return gulp.src('')
    //     .pipe(
    //         plugins.filesSync(module.exports.srcPaths, app.fn.path.distAssetsFolder(app.config.paths.fonts), {})
    //     )
}
