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

    // Delare const Variable for the panini Initializer Task
    module.exports.PANINI_INSTANCE_INITIALIZER_TASK = `panini${app.config.delimiters.tasks.subtasks}build`;

    // define Task function
    app.fn.tasks.defineTask(self, [], refresh);
};

/**
 * Load updated HTML templates and partials into Panini
 * @param {fn} callback
 */
function refresh(callback) {
    // panini instance check
    if (app.fn.typechecks.isEmpty(app.instances.panini)) {
        app.logger.debug(`${self.red}: no ${'panini instance'.red} can be found! perhaps the >>${build.cyan}<< task was not called. try to start it.`);
        gulp.start( this.PANINI_INSTANCE_INITIALIZER_TASK );
    }

    // second panini instance check
    if (app.fn.typechecks.isEmpty(app.instances.panini)) {
        app.logger.warn(`${self.red}: ${'panini instance'.red} still not found!`);
    }
    else {
        app.logger.warning('initiate panini refresh.');
        app.modules.panini.refresh();
    }
    callback();
}