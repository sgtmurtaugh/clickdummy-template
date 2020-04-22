'use strict';

let gulp;
let plugins;
let app;

module.exports = function ( _gulp, _plugins, _app ) {
    gulp = _gulp;
    plugins = _plugins;
    app = _app;

    return {

        /**
         * absolutePath
         * TODO
         * @param {string} paths
         */
        'absolutePath': function (...paths) {
            let absPath = null;

            if ( app.fn.typechecks.isNotEmpty(...paths) ) {
                absPath = app.modules.path.join(app.core.paths.root, ...paths);
            }
            return absPath;
        },

        /**
         * _absolutePath
         * TODO
         * @param {string} relativeParentPath
         * @param {string} paths
         * @private
         */
        '_absolutePathForParent': function (relativeParentPath, ...paths) {
            let absPath = null;

            if ( app.fn.typechecks.isEmpty(relativeParentPath) ) {
                absPath = this.absolutePath( paths );
            }
            else
            if ( app.fn.typechecks.isNotEmpty(...paths) ) {
                let newPaths = paths.slice();
                newPaths.unshift(relativeParentPath);

                absPath = app.modules.path.join(app.core.paths.root, ...newPaths);
            }
            else {
                absPath = app.modules.path.join(app.core.paths.root, relativeParentPath);
            }
            return absPath;
        },

        /**
         * distFolder
         * TODO
         * @param paths
         * @returns {string}
         */
        'distFolder': function (...paths) {
            let distPath = this._absolutePathForParent(app.core.paths.dist, ...paths);
/*
            if ( app.fn.typechecks.isNotEmpty(...paths) ) {
                let newPaths = paths.slice();
                newPaths.unshift(app.core.paths.dist);

                distPath = app.modules.path.join(app.core.paths.root, ...newPaths);
            }
            else {
                distPath = app.modules.path.join(app.core.paths.root, app.core.paths.dist);
            }
*/
            return distPath;
        },

        /**
         * distAssetsFolder
         * TODO
         * @param paths
         * @returns {string}
         */
        'distAssetsFolder': function (...paths) {
            return this.distFolder(paths, app.config.paths.assets);
        },

        /**
         * srcFolder
         * TODO
         * @param paths
         * @returns {string}
         */
        'srcFolder': function (...paths) {
            let srcPath = this._absolutePathForParent(app.core.paths.src, ...paths);
/*
            let srcPath = '';

            if ( app.fn.typechecks.isNotEmpty(...paths) ) {
                let newPaths = paths.slice();
                newPaths.unshift(app.core.paths.src);

                srcPath = app.modules.path.join(app.core.paths.root, ...newPaths);
            }
            else {
                srcPath = app.modules.path.join(app.core.paths.root, app.core.paths.src);
            }
*/
            return srcPath;
        },

        /**
         * srcAssetsFolder
         * TODO
         * @param paths
         * @returns {string}
         */
        'srcAssetsFolder': function (...paths) {
            return this.srcFolder(paths, app.config.paths.assets);
        },
    }
};
