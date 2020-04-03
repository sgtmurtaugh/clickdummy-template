'use strict';

// TODO Make this part of a global package for other projects

let gulp;
let plugins;
let app;

module.exports = function ( _gulp, _plugins, _app ) {
    gulp = _gulp;
    plugins = _plugins;
    app = _app;

    // Recursion breakOff object.
    let _requestedTasknames = [];
// TODO
    const GULP_TASKS_FOLDER = app.const.root + '/gulp/tasks';// + app.config.paths.path.gulpTasks;

    return {

        /**
         * taskname
         * @param filename
         * @return {*}
         * TODO
         */
        'taskname': function (filename) {
            return app.modules.path.basename(filename,
                app.modules.path.extname(filename)
            );
        },


        /**
         * loadTaskConfigs
         * TODO
         * @return {map}
         */
        'loadTaskConfigs': function () {
            return app.modules.requireDir(GULP_TASKS_FOLDER, {
                recurse: true,
                duplicates: false
            });
        },


        /**
         * isTaskDefined
         * checks gulp tree for the given taskname. undefined or null will result in true.
         * @param taskname {String}
         * @returns {boolean}
         */
        'isTaskDefined' : function (taskname) {
            let bIsTaskDefined = true;

            if (app.fn.typechecks.isNotEmptyString(taskname)) {
                bIsTaskDefined = gulp.tree().nodes.includes(taskname);
            }
            else {
                // TODO logging
                // undefined/null/empty Object
            }
            return bIsTaskDefined;
        },


        /**
         * registerTasks
         * TODO
         * @param jsonTasks {json}
         * @param cb
         */
        'registerTasks': function ( jsonTasks, cb ) {
            if ( jsonTasks !== null ) {
                for (let key in jsonTasks) {
                    if ( key !== null && jsonTasks.hasOwnProperty(key) ) {

                        let value = jsonTasks[key];

                        if (!this.isTaskDefined(key)) {
                            // value is an Object. It might contain JSON SubTask definitions
                            if ( app.fn.typechecks.isObject( value ) ) {
                                this.registerTasks( value, cb );
                            }
                            // The value is a Task Function and can be registered
                            else
                            if ( app.fn.typechecks.isFunction( value ) ) {
                                this.registerTask( value, cb );
                            }
                            // The value might be null or undefined
                            else {
                                console.log('The determined value Object will not be further processed! value : ' + value);
                            }
                        }
                        else {
                            console.log('task already registred: ' + key);
                        }
                    }
                }
            }
        },


        /**
         * registerTask
         * TODO
         * @param taskfunction
         * @param cb
         */
        'registerTask': function ( taskfunction, cb ) {
            if ( app.fn.typechecks.isFunction( taskfunction ) ) {
                taskfunction( gulp, plugins, app, cb );
            }
        },

        /**
         * registerDependingTasks
         * @param jsonTasks
         * @param tasknames
         * @param cb
         * TODO
         */
        'registerDependingTasks': function (jsonTasks, tasknames, cb) {
            if ( app.fn.typechecks.isArray( tasknames ) ) {
                for ( let taskname of tasknames ) {
                    let flag = false;

                    if (!this.isTaskDefined(taskname)) {
                        let taskfunction = this.lookupTaskFunction( jsonTasks, taskname, cb );

                        if ( taskfunction !== null ) {
                            this.registerTask( taskfunction, cb );
                            flag = true;
                        }
                    }

                    if ( !flag ) {
                        console.log('[ERROR] Task "' + taskname + '" not defined!');
                    }
                }
            }
        },


        /**
         * defineTask
         * @param taskname
         * @param dependingTasks
         * @param taskFunction
         * @param bParallelTasks
         * @returns {*}
         */
        'defineTask': function (taskname, dependingTasks, taskFunction, bParallelTasks = false) {
            if (app.fn.typechecks.isNotEmptyString(taskname)) {

                if (app.fn.typechecks.isNotEmpty(dependingTasks)) {
                    if (this.isEachTaskDefined(dependingTasks)) {
                        if (app.fn.typechecks.isNotEmpty(taskFunction) && app.fn.typechecks.isFunction(taskFunction)) {
                            if (!bParallelTasks) {
                                // gulp.task(taskname,
                                //     gulp.series(dependingTasks),
                                //     taskFunction
                                // );
                                module.exports[taskname] = gulp.series(dependingTasks, taskFunction);
                            }
                            else {
                                // gulp.task(taskname,
                                //     gulp.parallel(dependingTasks),
                                //     taskFunction
                                // );
                                module.exports[taskname] = gulp.parallel(dependingTasks, taskFunction);
                            }
                        }
                        else {
                            if (!bParallelTasks) {
                                // gulp.task(taskname,
                                //     gulp.series(dependingTasks)
                                // );
                                module.exports[taskname] = gulp.series(dependingTasks);
                            }
                            else {
                                // gulp.task(taskname,
                                //     gulp.parallel(dependingTasks)
                                // );
                                module.exports[taskname] = gulp.parallel(dependingTasks);
                            }
                        }
                    }
                }
                else {
                    if (app.fn.typechecks.isNotEmpty(taskFunction) && app.fn.typechecks.isFunction(taskFunction)) {

                        // gulp.task(taskname,
                        //     taskFunction
                        // );
                        module.exports[taskname] = taskFunction;
                    }
                    else {
                        console.log('[warn] neither there is a task function nor subtasks defined for task "' + taskname + '"');
                    }
                }
            }
console.log(module.exports);
        },


        /**
         * isEachTaskDefined
         * @param tasknames {String} / String-{Array}
         * @returns {boolean}
         * each value is checked by isTaskDefined method. undefined or null will result in true.
         */
        'isEachTaskDefined' : function (tasknames) {
            let bIsEachTaskDefined = true;

            if (app.fn.typechecks.isNotEmpty(tasknames)) {
                if (app.fn.typechecks.isArray(tasknames)) {
                    for (let taskname of tasknames) {
                        bIsEachTaskDefined = this.isTaskDefined(taskname);

                        if (!bIsEachTaskDefined)
                            break;
                    }
                }
                else
                if (app.fn.typechecks.isString(tasknames)) {
                    bIsEachTaskDefined = this.isTaskDefined(tasknames);
                }
                else {
                    // TODO logging
                    // no String or String Array -> no definition check possible!
                }
            }
            else {
                // TODO logging
                // undefined/null/empty Object
            }

            return bIsEachTaskDefined;
        },


    }
};