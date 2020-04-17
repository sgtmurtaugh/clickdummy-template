'use strict';

let gulp = require('gulp');
let gulpPlugins = require('gulp-load-plugins');
// let yargs = require('yargs');
let path = require('path');

// Load all Gulp plugins into one variable
const plugins = gulpPlugins();

// TODO check yargs usage...
// 'isProductive': !!(yargs.argv.production),

// TODO : extract app json to config file. location ./ or ./conf/default etc...
const app = {
    'config': {},
    'const' : {
        'delimiters': {
            'tasks': {
                'subtasks': ' :: '
            }
        },
        'env': {
            'default': 'development'
        },
        'fileEncoding': 'utf-8',
        'options': {
            'flatten': {
                'delimiter': '.'
            }
        },
        'paths': {
            'root': path.resolve(__dirname),
            'config': path.join(path.resolve(__dirname), 'conf'),
            'gulpConfig': path.join(path.resolve(__dirname), 'gulp', 'conf'),
            'gulpTasks': path.join(path.resolve(__dirname), 'gulp', 'tasks'),
            'gulpFunctions': path.join(path.resolve(__dirname), 'gulp', 'fn'),
        },
        'regex': {
            'stringSeparator': ',; '
        }
    },
    'fn' : {},
    'logger': console,
    'modules' : {
        'path': path
    },
    'tasks': {}
};

/**
 * TODO
 * @private
 */
function _init() {
    // preset evironment variables
    _preInitConfigEnvironmentVariables();

    // initialize and add required modules
    _initModules();

    // init additional objects
    _initAdditionalObjects();

    /* ### logger is now avaible ### */

    // load all gulpFunctions
    _loadGulpFunctions();

    // load dynamically all tasks
    _initGulpTasks();

    // postset environment variables
    _postInitConfigEnvironmentVariables();

    // optional log output for 'must have' objects
//    app.fn.log.traceObject( 'app.config', app.config );
//    app.fn.log.traceObject( 'app.fn', app.fn );
//    app.fn.log.traceObject( 'app.tasks', app.tasks );
}

/**
 * TODO
 * @private
 */
function _preInitConfigEnvironmentVariables() {
    // set NODE_CONFIG_DIR for module config to ./config/:./gulp/conf
    process.env.NODE_CONFIG_DIR = app.const.paths.config
        + app.modules.path.delimiter
        + app.const.paths.gulpConfig;

    // app.logger.debug('successful set pre-initialization environment variables' );
}

/**
 * TODO
 * @private
 */
function _postInitConfigEnvironmentVariables() {
    if ( app.fn.typechecks.isEmpty( process.env.NODE_ENV ) ) {
        // TODO Helper schreiben
        if ( app.config.has( 'environment' ) ) {
            process.env.NODE_ENV = app.config.get( 'environment' );
            app.logger.info( 'set default environment: '.cyan + process.env.NODE_ENV );
        }
        else {
            process.env.NODE_ENV = app.const.env.default;
            app.logger.info( 'set default environment to app default: '.cyan + process.env.NODE_ENV );
        }
    }

    // app.logger.debug('successful '.green + 'set post initialization environment variables' );
}

/**
 * TODO
 * @private
 */
function _initModules() {
    app.modules['arraySort'] = require('array-sort');
    app.modules['colors'] = require('colors');
    app.modules['config'] = require('config');
    app.modules['flat'] = require('flat');
    app.modules['fs'] = require('fs');
    app.modules['jsyaml'] = require('js-yaml');
    app.modules['lodash'] = require('lodash');
    app.modules['logging'] = require('console-logging');
    app.modules['requireDir'] = require('require-dir');
    app.modules['underscore'] = require('underscore');

    app.logger.info('successful '.green + 'modules loaded and linked.' );
}

/**
 * TODO
 * @private
 */
function _initAdditionalObjects() {
    // initialize app config
    _initAppConfig();

    // initalize app logger;
    _initLogger();

    app.logger.debug('successful '.green + 'initialized additional objects.' );
}

/**
 * TODO
 * @returns {{}}
 * @private
 */
function _initAppConfig() {
    // link loaded config module to additional alias 'app.config'
    app.config = app.modules.config;
    app.logger.info('successful '.green + 'additional config alias added.' );

    // now the config module can be loaded and returned
    return app.config;
}

/**
 * TODO
 * @private
 */
function _initLogger() {
    let logger = app.modules.logging.logger;

    if ( null !== logger ) {
        const PROP_LOGLEVEL = 'logger.logLevel';

        if ( app.config.has( PROP_LOGLEVEL ) ) {
            let logLevel = app.config.get( PROP_LOGLEVEL );
            logger.setLevel( logLevel );
            logger.debug('successful '.green + 'set logger logLevel: ' + logLevel );
        }

        logger.debug('successful '.green + 'logger initialized.' );

        // reset logger from init console to new logger
        app.logger = logger;
    }
}

/**
 * loads all defined gulp functions @link app.const.paths.gulpFunctions
 * @private
 */
function _loadGulpFunctions() {
    app.fn = require( app.const.paths.gulpFunctions )(gulp, plugins, app);
    app.logger.debug('successful '.green + 'loaded gulp functions.' );
}

/**
 * loads all defined task configurations (@link app.fn.tasks.loadTaskConfigs) and registers them in gulp (@link app.fn.tasks.registerTasks)
 * @private
 */
function _initGulpTasks() {
    // load task files
    app.tasks = app.fn.tasks.loadTaskConfigs();
    // app.fn.log.traceObject( 'app.tasks', app.tasks );

    let unregisteredTasks = Object.assign({}, app.tasks);

    // register gulp tasks
    if ( app.fn.typechecks.isNotEmpty( unregisteredTasks ) ) {
        let pass = 0;
        const maxPasses = app.fn.json.countKeys( unregisteredTasks, true );

        while ( app.fn.typechecks.isNotEmpty( unregisteredTasks ) ) {
            app.fn.tasks.registerTasks( unregisteredTasks );
            pass++;

            if ( pass > maxPasses ) {
                break;
            }
        }

        // if unregisteredTasks is still not empty, remove all remaining entries from initially loaded app.tasks!
        if ( app.fn.typechecks.isNotEmpty( unregisteredTasks ) ) {
            let flattenedUnregisteredAppTask = app.modules.flat.flatten(unregisteredTasks, app.const.options.flatten);

            // iter over unregisteredTasks
            app.modules.underscore.each(flattenedUnregisteredAppTask, function (value, key, list) {
                // remove task from app.tasks
                if ( app.tasks.hasOwnProperty(key) ) {
                    app.logger.debug(`remove unregistered task from initialized task list. task: '${key}'`);
                    delete app.tasks[key];
                }

                // format flattened key to path
                let folderKey = key.replace(app.const.options.flatten.delimiter, app.modules.path.sep);
                app.logger.warning('failed'.red + ' to register gulp tasks >>' + `${folderKey}`.red + '<<');
            });
        }
    }
    app.logger.info('finished'.green + ' registered gulp tasks.' + ` ${Object.keys(unregisteredTasks).length} tasks failed.`.yellow );
}

/**
 * runs application with all neccessary initialization etc.
 */
function run() {
    // start initialization
    _init();
}


// run application
run();