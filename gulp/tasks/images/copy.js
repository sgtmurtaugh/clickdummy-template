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
    app.fn.tasks.defineTask(self, [], copyImages);
};

/**
 * Copy images to the "dist" folder.
 * In production, the images are compressed
 * @param callback
 * @returns {*}
 */
function copyImages(callback) {
    return gulp.src([
        'src/assets/img/**',
        '!src/assets/img/*-src{,/**}'
    ]).pipe($.if(PRODUCTION, $.imagemin({
        progressive: true
    }))).pipe(gulp.dest('dist/assets/img'));
}
