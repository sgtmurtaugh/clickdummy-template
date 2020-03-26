'use strict';

// KBS Customized

let plugins = require('gulp-load-plugins');
let yargs = require('yargs');
let browser = require('browser-sync');
let gulp = require('gulp');
let panini = require('panini');
let rimraf = require('rimraf');
let sherpa = require('style-sherpa');
let yaml = require('js-yaml');
let fs = require('fs');
// let promise = require('gulp-promise');

// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Load settings from settings.yml
const {COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS, PROJECT} = loadConfig();

function loadConfig() {
    let ymlFile = fs.readFileSync('config.yml', 'utf8');
    return yaml.load(ymlFile);
}

const TASK_BUILD = "build";
const TASK_DEFAULT = "default";

let foundation = require('foundation-sites/gulpfile');
// let foundation = require('./node_modules/foundation-sites/gulpfile');
//
//
// // Build the "dist" folder by running all of the below tasks
// gulp.task(
//     TASK_BUILD,
//     gulp.series(
//         clean,
//         gulp.parallel(
//             pages,
//             sass,
//             javascript,
//             images,
//             fonts,
//             copy
//         ),
//         styleGuide
//     )
// );
//
// // Build the site, run the server, and watch for file changes
// gulp.task(TASK_DEFAULT,
//     gulp.series(TASK_BUILD, server, watch));
//
// // Delete the "dist" folder
// // This happens every time a build starts
// function clean(done) {
//     rimraf(PATHS.dist, done);
// }
//
// // Load updated HTML templates and partials into Panini
// function resetPages(done) {
//     panini.refresh();
//     done();
// }
//
// // Start a server with BrowserSync to preview the site in
// function server(done) {
//     browser.init({
//         server: PATHS.dist, port: PORT
//     });
//     done();
// }
//
// // Reload the browser with BrowserSync
// function reload(done) {
//     browser.reload();
//     done();
// }
//
//
// /* ################################################################################################################## */
//
//
// var rename = require('gulp-rename');
//
// // Copy page templates into finished HTML files
// function pages(done) {
//     return gulp.src(PROJECT.paths.src + '/pages/**/*.{html,hbs,handlebars}')
//         .pipe(panini({
//             root: PROJECT.paths.src + '/pages/',
//             layouts: PROJECT.paths.src + '/layouts/',
//             pageLayouts: 'default',
//             partials: PROJECT.paths.src + '/partials/',
//             data: PROJECT.paths.src + '/data/',
//             helpers: PROJECT.paths.src + '/helpers/'
//         }))
//         .pipe(gulp.dest(PATHS.dist))
// }
//
// // Copy fonts out of the assets folder
// // The fonts folder is not devided into themes because in production they are placed in apaches static folder without
// // an customer separation.
// function fonts(done) {
//     var assets = [
//         PROJECT.paths.src + '/assets/fonts/**/*'
//     ];
//
//     return gulp.src(assets)
//         .pipe(gulp.dest(PATHS.dist + '/assets/fonts'));
// }
//
// // Copy files out of the assets folder
// // This task skips over the "img", "js", "scss" and "fonts" folders, which are parsed separately
// function copy(done) {
//     var assets = [
//         PROJECT.paths.src + '/assets/**/*',
//         '!' + PROJECT.paths.src + '/assets/**/{img,js,scss,fonts}/**/*'
//     ];
//
//     return gulp.src(assets)
//         .pipe(gulp.dest(PATHS.dist + '/assets'));
// }
//
// // Compile Sass into CSS
// // In production, the CSS is compressed
// function sass(done) {
//     gulp.src(PROJECT.paths.src + '/assets/scss/app.scss')
//         .pipe($.sourcemaps.init())
//         .pipe($.sass({
//             includePaths: PATHS.sass
//         })
//             .on('error', $.sass.logError))
//         .pipe($.autoprefixer({
//             browsers: COMPATIBILITY
//         }))
//         // Comment in the pipe below to run UnCSS in production
//         //.pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
//         .pipe($.if(PRODUCTION, $.cssnano()))
//         .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
//         .pipe(rename({
//             basename: PROJECT.name,
//             suffix: '-' + PROJECT.version
//         }))
//         .pipe(gulp.dest(PATHS.dist + '/assets/css'))
//     // .pipe(myPromise.deliverGulpPromise(themesToBuild[theme]));
//     // .pipe(browser.reload({ stream: true }));
// }
//
// // Combine JavaScript into one file
// // In production, the file is minified
// function javascript(done) {
//     var jsLibs = PROJECT.paths.javascript;
//     if (jsLibs === undefined) jsLibs = [];
//
//     jsLibs.push('src/assets/js/app.js');
//     jsLibs.push('src/assets/js/!(app).js');
//
//     gulp.src(jsLibs, {allowEmpty: true})
//         .pipe($.sourcemaps.init())
//         .pipe($.babel())
//         .pipe($.concat('app.js'))
//         .pipe($.if(PRODUCTION, $.uglify()
//             .on('error', e => {
//                 console.log(e);
//             })
//         ))
//         .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
//         .pipe(rename({
//             basename: PROJECT.name,
//             suffix: '-' + PROJECT.version
//         }))
//         .pipe(gulp.dest(PATHS.dist + '/assets/js'))
//     // .pipe(myPromise.deliverGulpPromise(themesToBuild[theme]));
// }
//
// // Copy images to the "dist" folder
// // In production, the images are compressed
// function images(done) {
//     var src = [
//         PROJECT.paths.src + '/assets/img/vendor/**/*',
//         PROJECT.paths.src + '/assets/img/**/*'
//     ];
//
//     gulp.src(src)
//         .pipe($.if(PRODUCTION, $.imagemin({
//             progressive: true
//         })))
//         .pipe(gulp.dest(PATHS.dist + '/assets/img'))
//     // .pipe(myPromise.deliverGulpPromise(themesToBuild[theme]));
// }
//
// // Watch for changes to static assets, pages, Sass, and JavaScript
// function watch(done) {
//     gulp.watch(PROJECT.paths.src + PATHS.assets, copy);
//     gulp.watch(PROJECT.paths.src + '/pages/**/*.html').on('change', gulp.series(pages, browser.reload));
//     gulp.watch(PROJECT.paths.src + '/{layouts,partials}/**/*.html').on('change', gulp.series(resetPages, pages, browser.reload));
//     gulp.watch(PROJECT.paths.src + '/assets/scss/**/*.scss', sass);
//     gulp.watch(PROJECT.paths.src + '/assets/js/**/*.js').on('change', gulp.series(javascript, browser.reload));
//     gulp.watch(PROJECT.paths.src + '/assets/img/**/*').on('change', gulp.series(images, browser.reload));
//     gulp.watch(PROJECT.paths.src + '/assets/video/**/*').on('change', gulp.series(images, browser.reload));
//     gulp.watch(PROJECT.paths.src + '/styleguide/**').on('change', gulp.series(styleGuide, browser.reload));
//     done();
// }
//
// // Generate a style guide from the Markdown content and HTML template in styleguide/
// function styleGuide(done) {
//     return new Promise(function (resolve, reject) {
//         sherpa(PROJECT.paths.src + '/styleguide/index.md', {
//             output: PATHS.dist + '/styleguide.html',
//             template: PROJECT.paths.src + '/styleguide/template.html'
//         }, resolve);
//     });
// }
