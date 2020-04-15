'use strict';

// TODO Make this part of a global package for other projects

let gulp;
let plugins;
let app;

module.exports = function ( _gulp, _plugins, _app ) {
    gulp = _gulp;
    plugins = _plugins;
    app = _app;

    /**
     * TODO
     * @type {{filter: (function(*): boolean), extensions: [string, string], ignores: [string, string, string]}}
     */
    const DEFAULT_FOLDER_OPTIONS = {
        'extensions': [ '.js', '.json' ],
        'filter': function ( absolutePath ) {
            return true;
        },
        'ignores': [ '.ignore', '.exclude', 'node_modules' ]
    };
    module.exports.DEFAULT_FOLDER_OPTIONS = DEFAULT_FOLDER_OPTIONS;

    /**
     * TODO
     * @type {string}
     */
    const GULP_TASKS_FOLDER = app.modules.path.join(app.const.paths.root, 'gulp', 'tasks');

    return {

        /**
         * taskname
         * @param filename
         * @return {*}
         * Returns the basename for the given file without any path information - this basename is used as gulp taskname.
         */
        'taskname': function (filename) {
            let taskname = null;

            if (app.fn.typechecks.isNotEmpty(filename)) {
                let dirname = app.modules.path.dirname(filename);
                let basename = app.modules.path.basename(filename,
                    app.modules.path.extname(filename)
                );

                let regex = new RegExp(app.modules.path.sep, 'g');
                let relativePath = app.modules.path.join(dirname, basename).replace(GULP_TASKS_FOLDER, '');

                if (relativePath.startsWith(app.modules.path.sep)) {
                    relativePath = relativePath.substr(1);
                }
                taskname = relativePath.replace(regex, app.const.modules.flat.delimiter);
            }
            return taskname;
        },


        /**
         * subtasksFolder
         * @param filename
         * @param useFolderExtension - default is true
         * @param folderExtension - default is '.d'
         * @return {*}
         * TODO
         */
        'subtasksFolder': function (filename, useFolderExtension = true, folderExtension =  '.d') {
            return app.modules.path.join(
                app.modules.path.dirname(filename),
                this.taskname(filename) + ( useFolderExtension ? folderExtension : '' )
            );
        },


        /**
         * loadTaskConfigs
         * TODO
         * @param path
         * @param options
         * @returns {{}}
         */
        'loadTaskConfigs': function (path = GULP_TASKS_FOLDER, options = DEFAULT_FOLDER_OPTIONS) {
            let tasks = {};

            try {
                if (app.modules.fs.existsSync(path)) {
                    let files = app.modules.fs.readdirSync(path, {withFileTypes: true});

                    for (let file of files) {
                        let absoluteFile = app.modules.path.join(path, file);

                        // handle ignores
                        if ( options.ignores ) {
                            let bIgnore = false;

                            // split absolute file into its tokens
                            let pathTokens = absoluteFile.split( app.modules.path.sep );
                            for ( let ignore of options.ignores ) {

                                // check each path token
                                for ( let pathToken of pathTokens ) {
                                    if ( pathToken.startsWith( ignore ) || pathToken.endsWith( ignore ) ) {
                                        bIgnore = true;
                                        break;
                                    }
                                }

                                // ignore current file -> break ignore check
                                if ( bIgnore ) {
                                    break;
                                }
                            }

                            // ignore current file -> skip file
                            if ( bIgnore ) {
                                continue;
                            }
                        }

                        // eval filter -> skip file
                        if (options.filter && !options.filter(absoluteFile)) {
                            app.logger.info('file filtered!');
                            continue;
                        }

                        let taskname = this.taskname(absoluteFile);
console.log(taskname);

                        if (app.modules.fs.statSync(absoluteFile).isDirectory()) {
                            tasks[taskname] = this.loadTaskConfigs(absoluteFile);
                            app.logger.debug('task folder added: ' + tasks[taskname]);
                        }
                        else {
                            // file extensions
                            let extension = app.modules.path.extname( file );
                            if ( options.extensions ) {
                                if ( app.fn.typechecks.isEmpty(extension) || !options.extensions.includes(extension) ) {
                                    app.logger.debug('ignored by extension: ' + file);
                                    continue;
                                }
                            }

                            tasks[taskname] = require(absoluteFile);
                            app.logger.debug('task added: ' + (typeof tasks[taskname]));
                        }
                    }
console.log(tasks);

/*
                    tasks = app.modules.requireDir(path, {
                        recurse: true,
                        duplicates: false,
                        filter: function (path) {
                            return true;
                        },
                        extensions: ['.js']
                    });
*/
                }
            } catch(err) {
                app.logger.info(err);
            }

            return tasks;
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
                                let bSuccess = this.registerTask( value, cb );

                                if (!bSuccess) {
                                    app.unfinished.push( key );
                                }
                                else {
                                    delete jsonTasks[key];
                                }
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