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
    app.fn.tasks.defineTask(self, [], generateCSS);
};

/**
 * Compile SASS into CSS
 * In production, the CSS is compressed
 * @param {fn} callback
 * @returns {*}
 */
function generateCSS(callback) {
    return gulp.src(PROJECT.paths.src + '/assets/scss/app.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            includePaths: PATHS.sass
        })
        .on('error', $.sass.logError))
        .pipe($.autoprefixer({
                browsers: COMPATIBILITY
            }))
            // Comment in the pipe below to run UnCSS in production
            //.pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
            .pipe($.if(PRODUCTION, $.cssnano()))
            .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
            .pipe(rename({
                basename: PROJECT.name,
                suffix: '-' + PROJECT.version
        }))
        .pipe(gulp.dest(PATHS.dist + '/assets/css'))
        // .pipe(myPromise.deliverGulpPromise(themesToBuild[theme]));
        // .pipe(browser.reload({ stream: true }));
}
