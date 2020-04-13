'use strict';

// TODO Make this part of a global package for other projects

let gulp;
let plugins;
let app;

module.exports = function ( _gulp, _plugins, _app ) {

    gulp = _gulp;
    plugins = _plugins;
    app = _app;

    return {

        /**
         *
         * @param msg
         * @param obj
         */
        'traceObject': function (msg, obj) {
            if ( app.fn.typechecks.isEmptyString( msg ) ) {
                msg = ''; // TODO
            }

            app.logger.debug( "#################### > start " + msg + " ####################" );
            app.logger.debug( "" );
            app.logger.debug( obj );
            app.logger.debug( "" );
            app.logger.debug( "#################### < end " + msg + " ####################" );
            app.logger.debug( "" );
        }

    };
};
