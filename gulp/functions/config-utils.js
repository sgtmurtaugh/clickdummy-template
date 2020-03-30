'use strict';

let gulp;
let plugins;
let app;

module.exports = function ( _gulp, _plugins, _app ) {
    gulp = _gulp;
    plugins = _plugins;
    app = _app;
console.log('===============');
console.log(app.config.paths);
    const CONF_FOLDER = app.const.root + '/' + app.config.paths.path.gulpConfigurations;

    return {

        /**
         * getFolders
         * @param dir
         * TODO
         */
        'getFolders': function (dir) {
            return app.modules.fs.readdirSync(dir)
                .filter(function (file) {
                    return app.modules.fs.statSync(path.join(dir, file)).isDirectory();
                });
        },


        /**
         * loadConfig
         * @param file
         * @return {*}
         * TODO
         */
        'loadConfig': function (file) {
            let json = null;
            if (null !== file) {
                let configFile = app.modules.fs.readFileSync(file, 'utf-8');

                if (null !== configFile) {
                    json = JSON.parse(configFile);
                }
            }
            return json;
        },


        /**
         * loadConfigs
         * @param recursive
         * @return {map}
         * TODO
         */
        'loadConfigs': function (recursive) {
            if (recursive === undefined || recursive === null) {
                recursive = true;
            }

            return app.modules.requireDir(CONF_FOLDER, {recurse: recursive});
        }
    }
};
