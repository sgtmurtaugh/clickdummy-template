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
    app.fn.tasks.defineTask(self, [], copyImages);
};

/**
 * initializes an string array with all path in- and exludes for this copy task. the definition is exported for e.g.
 * the watch-task
 * @returns {(string)[]}
 * @private
 */
function _initAndExportSrcPaths() {
    return module.exports.srcPaths = [
        app.fn.path.srcAssetsFolder(app.config.paths.graphics, app.config.paths.images, '**', '*')
    ];
}

/**
 * Copy images to the "dist" folder.
 * In production, the images are compressed
 * @param callback
 * @returns {*}
 */
function copyImages(callback) {
    return gulp.src(module.exports.srcPaths)
        .pipe(plugins.if(PRODUCTION, plugins.imagemin({
            progressive: true
        })))
        .pipe(gulp.dest(
            app.fn.path.distAssetsFolder(app.config.paths.images)
        )
    );
// TODO: use fileSync instead!
//     return gulp.src('')
//         .pipe(
//             plugins.filesSync(module.exports.srcPaths, app.fn.path.distAssetsFolder(), {})
//         )
}
