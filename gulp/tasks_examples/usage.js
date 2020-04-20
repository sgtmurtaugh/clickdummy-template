'use strict';

let gulp;
let plugins;
let app;
let self;

module.exports = function (_gulp, _plugins, _app) {
    gulp = _gulp;
    plugins = _plugins;
    app = _app;
    self = app.fn.tasks.taskname(__filename);

    // if necessary - register depending tasks
//    let self_tasks = app.fn.tasks.registerDependingTasks(app.tasks);
    let self_tasks = [];

    // define Task function
    app.fn.tasks.defineTask(self, self_tasks, usage);
};

/**
 * usage
 * @param cb
 */
function usage(cb) {
    console.log(
        '\nList of all registered tasks:\n'.bold.underline);

    let tasks = app.fn.tasks.getRegisteredGulpTasks();

    if (app.fn.typechecks.isNotEmpty(tasks)) {
        // sort tasks alphabetically
        app.modules.arraySort(tasks);

        for (let task of tasks) {
            console.log(' - '.bold + task.yellow);
        }
    }

    console.log(
        '\nusage:'.bold +
        '\n  npm start '.green + '{taskname}'.italic.yellow +
        '\nor'.italic +
        '\n  gulp '.green + '{taskname}\n'.italic.yellow
    );
    cb();
}
