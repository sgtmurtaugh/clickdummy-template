'use strict';

let gulp;
let plugins;
let app;
let self;
let selfFolder;

module.exports = function ( _gulp, _plugins, _app ) {
    gulp = _gulp;
    plugins = _plugins;
    app = _app;
    self = app.fn.tasks.taskname(__filename);
    selfFolder = app.fn.tasks.subtasksFolder(__filename);

    // define Task function
    app.fn.tasks.defineTask(self, [], generate);
};

/**
 * Generate a style guide from the Markdown content and HTML template in styleguide/
 * @param callback
 */
function generate(callback) {
    sherpa('src/styleguide/index.md', {
            output: config.paths.dist.path + '/doc/styleguide.html',
            template: 'src/styleguide/template.html'
        }, done
    );
}
