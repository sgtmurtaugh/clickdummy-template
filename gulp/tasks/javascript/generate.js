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
    app.fn.tasks.defineTask(self, [], generate);
};

/**
 * Combine JavaScript into one file
 * In production, the file is minified
 * @param callback
 * @returns {*}
 */
function generate(callback) {
    return gulp.src(config.paths.src.javascript)
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.concat('app.js'))
        .pipe($.if(PRODUCTION, $.uglify()
            .on('error', e => { console.log(e); })
        ))
        .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
        .pipe(gulp.dest(config.paths.dist.javascript));
}
