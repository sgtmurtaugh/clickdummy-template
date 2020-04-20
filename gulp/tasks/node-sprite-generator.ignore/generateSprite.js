'use strict';

import path from "path";

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
    app.fn.tasks.defineTask(self, [], generateSprites());

};

/**
 * Determines all sprite folders inside the sprite-src folder and
 * runs the generateSprite function on each of them.
 * @param {fn} callback
 */
function generateSprites(callback) {
    let folders = getFolders(config.nsg.sprite_src);
    folders.forEach( function (folder) {
        return generateSprite(folder);
    });
    callback();
}

/**
 * Determines all sprite folders inside the sprite-src folder and
 * runs the generateSprite function on each of them.
 * @param {fn} callback
 */
function generateSingleSprite(callback) {
    return generateSprite(null);
}

/**
 * Creates and runs the Node-Sprite-Generator on the given folder.
 * Only PNG files will be used for the sprite. The output is a sprite PNG and a
 * SASS source file with all containing image informations.
 * @param {string} folder
 * @returns {*}
 */
function generateSprite(folder) {
    let currentSprite = folder;
    if (utils.typechecks.isEmpty(folder)) {
        folder = '';
        currentSprite = 'all-sprites';
    }

    return new Promise(function(resolve, reject) {
        console.log('Start generating sprite for \'' + currentSprite + '\' ...');

        let spriteName = '-' + config.nsg.sprite_prefix + currentSprite + config.nsg.sprite_suffix + "-";
        let spriteFilename = config.nsg.sprite_prefix + currentSprite + config.nsg.sprite_suffix + '.png';
        let stylesheetFilename = config.nsg.stylesheet_prefix + currentSprite + config.nsg.stylesheet_suffix + config.nsg.stylesheet_extension;

        nsg({
            spritePath: path.join(config.nsg.sprite_target, spriteFilename),
            src: [
                path.join(config.nsg.sprite_src, folder, '**/*.png')
            ],
            stylesheet: 'scss',
            stylesheetPath: path.join(config.nsg.stylesheet_target, stylesheetFilename ),
            stylesheetOptions: {
                prefix: spriteName,
                spritePath: '/assets/img/sprites/' + spriteFilename
            },
            compositor: 'jimp',
            layout: 'packed',
            layoutOptions: {
                padding: 30
            }
        }, function (err) {
            console.log('Sprite for \'' + currentSprite + '\' generated!');
        });
        resolve();
    });
}
