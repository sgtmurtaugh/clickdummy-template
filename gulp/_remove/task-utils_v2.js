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
    const GULP_TASKS_FOLDER = app.const.paths.root + '/gulp/tasks';// + app.config.paths.path.gulpTasks;

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
         * lookupTaskFunction
         * @param jsonTasks
         * @param taskname
         * @return {*}
         * TODO
         */
        'lookupTaskFunction': function (jsonTasks, taskname) {
            let taskvalue = null;

            // Wenn das uebergebene jsonTasks Objekt nicht null ist
            if ( app.fn.typechecks.isObject( jsonTasks ) ) {
                // Wenn ein taskname uebergeben wurde, in dem JSON direkt nach einem Key taskname suchen
                if ( taskname !== null ) {
                    if ( jsonTasks.hasOwnProperty(taskname) ) {
                        taskvalue = jsonTasks[taskname];
                    }

                    // Wenn der ermittelte Wert eine Task-Function ist, dann diese zurueckgeben, andernfalls den JSON
                    // Baumrekursiv durchsuchen.
                    if ( ! app.fn.typechecks.isFunction( taskvalue ) ) {
                        for ( let key in jsonTasks ) {
                            if ( key !== null
                                && jsonTasks.hasOwnProperty(key) ) {

                                taskvalue = this.lookupTaskFunction(jsonTasks[key], taskname);

                                if ( taskvalue !== null ) {
                                    break;
                                }
                            }
                        }
                    }
                }
            }

            return taskvalue;
        },


        /**
         * lookupTasknames
         * @param jsonTasks
         * @return {Array}
         * TODO
         */
        'lookupTasknames' : function (jsonTasks) {
            let tasknames = [];

            // Wenn das uebergebene jsonTasks Objekt nicht null ist
            if ( app.fn.typechecks.isObject( jsonTasks ) ) {

                for ( let taskname in jsonTasks ) {
                    if ( taskname !== null
                        && jsonTasks.hasOwnProperty(taskname) ) {

                        let taskvalue = jsonTasks[taskname];

                        if ( app.fn.typechecks.isFunction(taskvalue) ) {
                            tasknames.push(taskname);
                        }
                        else {
                            tasknames = tasknames.concat(
                                this.lookupTasknames(taskvalue)
                            );
                        }
                    }
                }
            }
            return tasknames;
        },


        /**
         * isTaskDefined
         * checks gulp tree for the given taskname. undefined or null will result in true.
         * @param taskname {String}
         * @returns {boolean}
         */
        'isTaskDefined' : function (taskname) {
            let bIsTaskDefined = false;

            if (app.fn.typechecks.isNotEmptyString(taskname)) {
// TODO
//                bIsTaskDefined = app.fn.typechecks.isNotEmpty( module.exports[taskname] );
                bIsTaskDefined = gulp.tree().nodes.includes( taskname );
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
            if ( app.fn.typechecks.isEmpty( jsonTasks ) ) {
                app.logger.warn( 'no json tasks defined!' );
            }
            else {
                for (let key in jsonTasks) {
                    if ( app.fn.typechecks.isNotEmpty( key )
                            && jsonTasks.hasOwnProperty(key) ) {

                        let value = jsonTasks[key];

                        if ( !this.isTaskDefined(key) ) {
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
                                app.logger.debug('The determined value Object will not be further processed! value : ' + value);
                            }
                        }
                        else {
                            app.logger.debug('task already registred: ' + key);
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
        'registerTask': function ( taskfunction ) {
            let bRegistered = false;

            if ( app.fn.typechecks.isFunction( taskfunction ) ) {
                taskfunction( gulp, plugins, app );
                bRegistered = true;
            }
            return bRegistered;
        },


        /**
         * registerDependingTask
         * @param jsonTasks
         * @param taskname
         * @param cb
         * TODO
         */
        'registerDependingTask': function (jsonTasks, taskname, cb) {
            if ( app.fn.typechecks.isNotEmptyString( taskname ) ) {
                let bIsRegistered = this.isTaskDefined( taskname );

                // when no registered task with the given name can be found, try to register the task
                if ( !bIsRegistered ) {
                    let taskfunction = this.lookupTaskFunction( jsonTasks, taskname );

                    if ( taskfunction !== null ) {
                        bIsRegistered = this.registerTask( taskfunction );
                    }
                }

                // log error an call cb, if registration failed
                if ( !bIsRegistered ) {
                    app.logger.error('Task "' + taskname + '" not defined!');
                    cb();
                }
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
            if ( app.fn.typechecks.isEmpty( tasknames ) ) {
                app.logger.debug( 'var tasknames is empty/null.' );
            }
            else {
                // handle strings if neccessary and split them into an array
                if ( app.fn.typechecks.isString( tasknames ) ) {
                    app.logger.debug( 'var tasknames is of type string. try to split values by "' + app.const.regex.stringSeparator + '".' );
                    tasknames = tasknames.split( app.const.regex.stringSeparator );
                }

                if ( app.fn.typechecks.isArray( tasknames ) ) {
                    for ( let taskname of tasknames ) {
                        this.registerDependingTask( jsonTasks, taskname, cb );
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
        'defineTask': function ( taskname, dependingTasks, taskFunction, bParallelTasks = false ) {
            if (app.fn.typechecks.isNotEmptyString( taskname ) ) {
                if (app.fn.typechecks.isNotEmpty( dependingTasks ) ) {
                    if (this.isEachTaskDefined( dependingTasks ) ) {
                        if ( app.fn.typechecks.isFunction( taskFunction ) ) {
                            if ( !bParallelTasks ) {
//                                module.exports[taskname] = gulp.series( dependingTasks, taskFunction );
                                gulp.task( taskname, gulp.series( dependingTasks, taskFunction ) );
                            }
                            else {
//                                module.exports[taskname] = gulp.parallel( dependingTasks, taskFunction );
                                gulp.task( taskname, gulp.parallel( dependingTasks, taskFunction ) );
                            }
                        }
                        else {
                            if ( !bParallelTasks ) {
//                                module.exports[taskname] = gulp.series( dependingTasks );
                                gulp.task( taskname, gulp.series( dependingTasks  ) );
                            }
                            else {
//                                module.exports[taskname] = gulp.parallel( dependingTasks );
                                gulp.task( taskname, dependingTasks );
                            }
                        }
                    }
                }
                else {
                    if ( app.fn.typechecks.isString( taskFunction ) ) {
                        // Attention: Without this series, an assertionError is thrown!
                        // For further infomations check https://www.liquidlight.co.uk/blog/how-do-i-update-to-gulp-4/
//                        module.exports[taskname] = taskFunction;
                        gulp.task( taskname, gulp.series( taskFunction ) );
                    }
                    else
                    if ( app.fn.typechecks.isFunction( taskFunction ) ) {

//                        module.exports[taskname] = taskFunction;
                        gulp.task( taskname, taskFunction );
                    }
                    else {
                        app.logger.debug('[warn] neither there is a task function nor subtasks defined for task "' + taskname + '"');
                    }
                }

            }
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