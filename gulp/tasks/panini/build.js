'use strict';

let gulp;
let plugins;
let app;
let self;
let selfFolder;

/**
 * module function
 * @param {Gulp} _gulp
 * @param {*} _plugins
 * @param {*} _app
 */
module.exports = function ( _gulp, _plugins, _app ) {
    gulp = _gulp;
    plugins = _plugins;
    app = _app;
    self = app.fn.tasks.taskname(__filename);
    selfFolder = app.fn.tasks.subtasksFolder(__filename);

    // initialize panini
    initPanini();

    // define Task function
    app.fn.tasks.defineTask(self, [], build);
};

/**
 *
 */
function initPanini() {
    // load and register additional module
    let panini = app.fn.app.requireModule('panini')({
        root: app.fn.path.srcFolder(),
        layouts: app.fn.path.srcFolder(app.config.paths.layouts),
        pageLayouts: app.config.panini.defaultPageLayout,
        partials: app.fn.path.srcFolder(app.config.paths.partials),
        data: app.fn.path.srcFolder(app.config.paths.data),
        helpers: app.fn.path.srcFolder(app.config.paths.helpers)
    });
    app.fn.app.addInstance( 'panini', panini );
}

/**
 * Copy page templates into finished HTML files
 * @param callback
 * @returns {*}
 */
function build(callback) {
    let bError = false;

    // panini instance check
    if (app.fn.typechecks.isEmpty(app.instances.panini)) {
        app.logger.error(`${self.red}: no ${'panini instance'.red} can be found!`);
        bError = true;
    }

    // panini src path
    let srcPath = app.fn.path.srcFolder(app.config.paths.pages, '**', '*.{html,hbs,handlebars}');
    app.logger.debug(`panini srcPath: ${srcPath}`);
    if (app.fn.typechecks.isEmpty(srcPath)) {
        app.logger.error(`${self.red}: no ${'panini srcPath'.red} can be found!`);
        bError = true;
    }

    // panini dist path
    let distPath = app.fn.path.distFolder();
    app.logger.debug(`panini distPath: ${distPath}`);
    if (app.fn.typechecks.isEmpty(distPath)) {
        app.logger.error(`${self.red}: no ${'panini distPath'.red} can be found!`);
        bError = true;
    }

    if ( bError ) {
        callback();
    }
    else {
        return gulp.src(srcPath)
            .pipe(app.instances.panini)
            .pipe(gulp.dest(distPath));
    }
}
