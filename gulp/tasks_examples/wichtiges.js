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
    console.log('\r\n');
    console.log('List of all registered tasks:'.bold);

    let tasks = app.fn.tasks.lookupTasknames(app.tasks);

    if (null !== tasks) {
        for (let task of tasks) {
            console.log(' - ' + task.yellow);
        }
    }

    console.log('');
    console.log('usage:'.bold);
    console.log('  npm start '.green + '{taskname}'.italic.yellow);
    console.log('or'.italic);
    console.log('  gulp '.green + '{taskname}'.italic.yellow + '\r\n');
    cb();
}
