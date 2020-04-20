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
    app.fn.tasks.defineTask(self, [], build);
};

/**
 * Copy page templates into finished HTML files
 * @param callback
 * @returns {*}
 */
function build(callback) {
    return gulp.src(PROJECT.paths.src + '/pages/**/*.{html,hbs,handlebars}')
        .pipe(panini({
            root: PROJECT.paths.src + '/pages/',
            layouts: PROJECT.paths.src + '/layouts/',
            pageLayouts: 'default',
            partials: PROJECT.paths.src + '/partials/',
            data: PROJECT.paths.src + '/data/',
            helpers: PROJECT.paths.src + '/helpers/'
        }))
        .pipe(gulp.dest(PATHS.dist))
}
