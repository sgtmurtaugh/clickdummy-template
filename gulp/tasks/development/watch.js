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
    app.fn.tasks.defineTask(self, [], watch);
};

/**
 * Watch for changes to static assets, pages, Sass, and JavaScript
 * @param {fn} callback
 */
function watch(callback) {
    // assets
    gulp.watch(config.paths.assets, copyAssets);

    // html pages
    gulp.watch('src/pages/**/*.html').on('change', gulp.series(generatePages, browser.reload));
    // html layouts and partials
    gulp.watch('src/{layouts,partials}/**/*.html').on('change', gulp.series(resetPages, generatePages, browser.reload));

    // sass
    gulp.watch('src/assets/scss/**/*.scss', generateSASS);

    // javascript
    gulp.watch('src/assets/js/**/*.js').on('change', gulp.series(generateJS, browser.reload));

    // images
    gulp.watch('src/assets/img/**/*').on('change', gulp.series(copyImages, browser.reload));

    // styleguide
    gulp.watch('src/styleguide/**').on('change', gulp.series(generateStyleGuide, browser.reload));

    callback();
}
