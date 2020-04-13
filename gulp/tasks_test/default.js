'use strict';

let gulp;
let plugins;
let app;
let self;

module.exports = function ( _gulp, _plugins, _app ) {
    gulp = _gulp;
    plugins = _plugins;
    app = _app;
    self = app.fn.tasks.taskname(__filename);

    // if necessary - register depending tasks
    // register exported module functions
/*
    for ( let prop of Object.getOwnPropertyNames( module.exports ) ) {
        if ( app.fn.typechecks.isFunction( module.exports[prop] ) ) {
            app.fn.tasks.defineTask(self + '#' + prop, module.exports[prop] );
        }
    }
*/
    //    let self_tasks = app.fn.tasks.registerDependingTasks(app.tasks, 'build');
    let self_tasks = app.fn.tasks.registerDependingTasks( app.task );

    // define Task function
    app.fn.tasks.defineTask( self, self_tasks, module.exports.usage );

};

/**
 * usage
 * @param cb
 */
module.exports.usage = function (cb) {
    console.log('\r\nList of all registred tasks:\r\n');

    let tasks = app.fn.tasks.lookupTasknames(app.tasks);

    if (null !== tasks) {
        for (let task of tasks) {
            console.log(' - ' + task);
        }
    }
    console.log('');
    console.log('npm start {taskname}\r\n');
    cb();
};

/*
module.exports.usage2 = function (cb) {
    console.log('\r\nList of all registred tasks:\r\n');

    let tasks = app.fn.tasks.lookupTasknames(app.tasks);

    if (null !== tasks) {
        for (let task of tasks) {
            console.log(' - ' + task);
        }
    }
    console.log('');
    console.log('npm start {taskname}\r\n');
    cb();
};

function usage(cb) {
    console.log('\r\nList of all registred tasks:\r\n');

    let tasks = app.fn.tasks.lookupTasknames(app.tasks);

    if (null !== tasks) {
        for (let task of tasks) {
            console.log(' - ' + task);
        }
    }
    console.log('');
    console.log('npm start {taskname}\r\n');
    cb();
};
*/