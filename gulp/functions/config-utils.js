'use strict';

let gulp;
let plugins;
let app;

module.exports = function ( _gulp, _plugins, _app ) {
    gulp = _gulp;
    plugins = _plugins;
    app = _app;

    const MAIN_APP_CONFIG_YAML = app.const.root + '/config.yml';
    const MAIN_APP_CONFIG_JSON = app.const.root + '/config.json';

    // TODO get path from main config file!
    const APP_CONF_FOLDER = app.const.root + '/config';
    const GULP_CONF_FOLDER = app.const.root + '/gulp/conf';

    return {

        /**
         * getFolders
         * @param dir
         * TODO
         */
        'getFolders': function (dir) {
            return app.modules.fs.readdirSync(dir)
                .filter(function (file) {
                    return app.modules.fs.statSync(app.modules.path.join(dir, file)).isDirectory();
                });
        },


        /**
         * loadAppConfigs
         * @param recursive
         * @return {map}
         * TODO
         */
        'loadAppConfigs': function (recursive) {
            if (recursive === undefined || recursive === null) {
                recursive = true;
            }

            // core yaml config lookup
            let confs = {};
            let configYAML = this.loadYAMLConfig( MAIN_APP_CONFIG_YAML );
            if ( configYAML !== null ) {
                confs = app.modules._.extend(
                    confs,
                    configYAML
                );
            }

            // core json config lookuo
            let configJSON = this.loadJSONConfig( MAIN_APP_CONFIG_JSON );
            if ( configJSON !== null ) {
                confs = app.modules._.extend(
                    confs,
                    configJSON
                );
            }

            // additional gulp config lookup
            let gulpConfigs = this.loadConfigs( GULP_CONF_FOLDER, true );
            if ( gulpConfigs !== null ) {
                confs = app.modules._.extend(
                    confs,
                    gulpConfigs
                );
            }

            // additional gulp config lookup
            let otherConfigs = this.loadConfigs( APP_CONF_FOLDER, true );
            if ( otherConfigs !== null ) {
                confs = app.modules._.extend(
                    confs,
                    otherConfigs
                );
            }

            return confs;
        },


        /**
         * loadConfigs
         * @param folder
         * @param recursive
         * @return {map}
         * TODO
         */
        'loadConfigs': function (folder, recursive) {
            let conf = {};
            if ( folder !== null ) {
                try {
                    if (recursive === undefined || recursive === null) {
                        recursive = true;
                    }

                    conf = app.modules.requireDir(folder, {recurse: recursive});
                }
                catch ( err ) {
                    if ( err.code === 'ENOENT' ) {
                        app.logger.info('Folder not found. folder: ' + folder.yellow);
                    }
                    else {
                        throw err;
                    }
                }
            }
            return conf;
        },


        /**
         * loadJSONConfig
         * @param file
         * @return {*}
         * TODO
         */
        'loadJSONConfig': function (file) {
            let json = null;
            let configFile = this.readFile(file);

            if (null !== configFile) {
                json = JSON.parse(configFile);
            }
            return json;
        },


        /**
         * loadYAMLConfig
         * @param file
         * @returns {null}
         */
        'loadYAMLConfig': function (file) {
            let json = null;
            let configFile = this.readFile(file);

            if (null !== configFile) {
                json = app.modules.jsyaml.safeLoad( configFile );
            }
            return json;
        },


        /**
         * readFile
         * @param file
         * @returns {null}
         */
        'readFile': function (file) {
            let configFile = null;

            if ( null !== file ) {
                try {
                    configFile = app.modules.fs.readFileSync(file, app.const.fileEncoding);
                }
                catch ( err ) {
                    if ( err.code === 'ENOENT' ) {
                        app.logger.info('File not found. file: ' + file.yellow);
                    }
                    else {
                        throw err;
                    }
                }
            }
            return configFile;
        }
    }


};
