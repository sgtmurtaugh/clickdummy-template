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
    'const' : {
        'delimiters': {
            'tasks': {
                'subtasks': '@'
            }
        },
        'env': {
            'default': 'development'
        },
        'fileEncoding': 'utf-8',
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
    'modules' : {
        'path': path
    },
    'fn' : {},
    'config': null,
    'tasks': {},
    'logger': console
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

    app.logger.info('successful'.green + ' set pre initialization environment variables' );
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

    app.logger.info('successful'.green + ' set post initialization environment variables' );
}

/**
 * TODO
 * @private
 */
function _initModules() {
    app.modules['fs'] = require('fs');
    app.modules['requireDir'] = require('require-dir');
    app.modules['config'] = _initModuleConfig();
    app.modules['jsyaml'] = require('js-yaml');
    app.modules['underscore'] = require('underscore');
    app.modules['lodash'] = require('lodash');
    app.modules['logging'] = require('console-logging');
    app.modules['flat'] = require('flat');

    app.logger.info('successful app modules loaded.' );
}

/**
 * TODO
 * @returns {{}}
 * @private
 */
function _initModuleConfig() {
    // link loaded config module to additional alias 'app.config'
    app.config = require('config');
    app.logger.info('successful loaded module config.' );

    // now the config module can be loaded and returned
    return app.config;
}

/**
 * TODO
 * @private
 */
function _initAdditionalObjects() {
    // initalize logger;
    app.logger = _initLogger();
}

/**
 * TODO
 * @returns {{}}
 * @private
 */
function _initLogger() {
    var logger = app.modules.logging.logger;

    const PROP_LOGLEVEL = 'logger.logLevel';
    if ( null !== logger ) {
        if ( app.config.has( PROP_LOGLEVEL ) ) {
            let logLevel = app.config.get( PROP_LOGLEVEL );
            logger.setLevel( logLevel );
            app.logger.info('successful'.green + ' set logger logLevel: ' + logLevel );
        }

        app.logger.info('successful logger initialized.' );
    }
    return logger;
}

/**
 * loads all defined gulp functions @link app.const.paths.gulpFunctions
 * @private
 */
function _loadGulpFunctions() {
    app.fn = require( app.const.paths.gulpFunctions )(gulp, plugins, app);
    app.logger.info('successful'.green + ' loaded gulp functions.' );
}

/**
 * loads all defined task configurations (@link app.fn.tasks.loadTaskConfigs) and registers them in gulp (@link app.fn.tasks.registerTasks)
 * @private
 */
function _initGulpTasks() {
    // load task files
    app.tasks = app.fn.tasks.loadTaskConfigs();
    // app.fn.log.traceObject( 'app.tasks', app.tasks );

    let unfinishedTasks = app.modules.flat.flatten(Object.assign({}, app.tasks));
    // register gulp tasks
    app.fn.tasks.registerTasks( unfinishedTasks );
    // app.logger.info('successful'.green + ' registered gulp tasks.' );
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