'use strict';

let gulp = require('gulp');
let gulpPlugins = require('gulp-load-plugins');
// let yargs = require('yargs');
let path = require('path');

// Load all Gulp plugins into one variable
const plugins = gulpPlugins();

// TODO : extract app json to config file. location ./ or ./conf/default etc...
const app = {
    'config': null,
    'core': {
        'paths': {
            'root': path.resolve(__dirname),
            'gulpConfig': path.join(path.resolve(__dirname), 'gulp', 'conf'),
            'gulpTasks': path.join(path.resolve(__dirname), 'gulp', 'tasks'),
            'gulpFunctions': path.join(path.resolve(__dirname), 'gulp', 'fn'),

            'config': 'conf',
            'dist': 'dist',
            'src': 'src',
        },
    },
    'fn': {},
    'instances': {
        'logger': console
    },
    'modules': {
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
    process.env.NODE_CONFIG_DIR = app.core.paths.gulpConfig
        + app.modules.path.delimiter
        + app.core.paths.config;
}

/**
 * TODO
 * @private
 // TODO implement environment helper
 */
function _postInitConfigEnvironmentVariables() {
    // eval console param
    console.log(app.modules.yargs.argv);
    console.log(app.modules.yargs.argv._);
    console.log(app.modules.yargs.argv.production);
    console.log(app.modules.yargs.argv.wumpe);
    app.fn.env.setEnvironment( app.modules.yargs.argv._ );
    // TODO: cleanup
    // if ( !!(app.modules.yargs.argv.production) ) {
    //     process.env.NODE_ENV = 'production';
    //     app.logger.info('set environment by console param: '.cyan + process.env.NODE_ENV);
    // }
    //
    // // if environment var is not set, then check config or finally default fallback
    // if ( app.fn.typechecks.isEmpty( process.env.NODE_ENV ) ) {
    //     if ( app.config.has( 'environment' ) ) {
    //         process.env.NODE_ENV = app.config.get( 'environment' );
    //         app.logger.info( 'set default environment: '.cyan + process.env.NODE_ENV );
    //     }
    //     else {
    //         process.env.NODE_ENV = app.config.get('env.default');
    //         app.logger.info( 'set default environment to app default: '.cyan + process.env.NODE_ENV );
    //     }
    // }
}

/**
 * TODO
 * @private
 */
function _initModules() {
    app.modules['arraySort'] = require('array-sort');
    app.modules['camelCase'] = require('camel-case');
    app.modules['colors'] = require('colors');
    app.modules['config'] = require('config');
    app.modules['flat'] = require('flat');
    app.modules['fs'] = require('fs');
    app.modules['jsYaml'] = require('js-yaml');
    app.modules['lodash'] = require('lodash');
    app.modules['logging'] = require('console-logging');
    app.modules['requireDir'] = require('require-dir');
    app.modules['rimraf'] = require('rimraf');
    app.modules['underscore'] = require('underscore');
    app.modules['yargs'] = require('yargs');
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
            let logLevel = app.config.get( PROP_LOGLEVEL ).toUpperCase();
            logger.setLevel( logLevel );
            logger.debug('successful '.green + 'set logger logLevel: ' + logLevel );
        }

        logger.debug('successful '.green + 'logger initialized.' );

        // add logger shortcut in app. this is an exception! all other objects are stored under app.instances... but the method definitions are loaded
        app.logger = logger;
    }
}

/**
 * loads all defined gulp functions @link app.const.paths.gulpFunctions
 * @private
 */
function _loadGulpFunctions() {
    app.fn = require( app.core.paths.gulpFunctions )(gulp, plugins, app);
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

        // register defined gulp tasks
        while ( app.fn.typechecks.isNotEmpty( unregisteredTasks ) ) {
            app.fn.tasks.registerTasks( unregisteredTasks );
            pass++;

            if ( pass > maxPasses ) {
                break;
            }
        }

        // if unregisteredTasks is still not empty, remove all remaining entries from initially loaded app.tasks!
        if ( app.fn.typechecks.isNotEmpty( unregisteredTasks ) ) {
            let flattenedUnregisteredAppTask = app.modules.flat.flatten(unregisteredTasks, app.config.get('options.flatten'));

            // iter over unregisteredTasks
            app.modules.underscore.each(flattenedUnregisteredAppTask, function (value, key, list) {
                // remove task from app.tasks
                if ( app.tasks.hasOwnProperty(key) ) {
                    app.logger.debug(`remove unregistered task from initialized task list. task: '${key}'`);
                    delete app.tasks[key];
                }

                // format flattened key to path
                let folderKey = key.replace(app.config.get('options.flatten.delimiter'), app.modules.path.sep);
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
