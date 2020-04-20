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

    let subtasks = app.fn.tasks.loadTaskConfigs(selfFolder);

    // if necessary - register depending tasks
//    let self_tasks = app.fn.tasks.registerDependingTasks(app.tasks);
    let self_tasks = [];

    // define Task function
    app.fn.tasks.defineTask(self, self_tasks);
};
