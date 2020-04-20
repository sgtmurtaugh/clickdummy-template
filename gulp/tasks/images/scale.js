'use strict';

import fs from "fs";

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
    app.fn.tasks.defineTask(self, [], scaleImages);
};

/**
 * scaleImages
 * @param callback
 */
function scaleImages(callback) {
    let files = glob.sync( config.resizer.src, {
        "absolute": true
    });

    for (let file of files) {
        if (utils.typechecks.isNotEmpty(file)) {
            let indexRelativPath = file.indexOf(config.resizer.path);

            if (indexRelativPath > -1) {
                let absolutPathPrefix = "";
                if (indexRelativPath > 0) {
                    absolutPathPrefix = file.substring(0, indexRelativPath);
                }

                if (file.length > indexRelativPath) {
                    let filename = file.substring(indexRelativPath + config.resizer.path.length);

                    for( let dimensionKey in config.resizer.sizes ) {
                        let indexExtension = filename.lastIndexOf('.');

                        if (indexExtension > -1) {
                            if (config.resizer.sizes.hasOwnProperty(dimensionKey)) {
                                let dimension = config.resizer.sizes[dimensionKey];

                                if (utils.typechecks.isNotEmpty(dimension)) {
                                    // Pruefen, ob height und width gesetzt sind
                                    let resizerOptions = {};
                                    let bHasWidth = utils.typechecks.isNumeric(dimension.width);
                                    let bHasHeight = utils.typechecks.isNumeric(dimension.height);

                                    // Fehlen beide Dimensionsangaben, dann diese Groese ueberspringen
                                    if (!bHasWidth && !bHasHeight) {
                                        console.log("size '" + dimensionKey + "' besitzt weder eine Hoehen noch eine Breitenangabe!");
                                        continue;
                                    }

                                    // default setzen, wenn nur eine Dimensionsangabe angegeben wurde
                                    if (!bHasWidth) {
                                        // dimension.width = -1;
                                        dimension.width = "auto";
                                    }
                                    if (!bHasHeight) {
                                        // dimension.height = -1;
                                        dimension.height = "auto";
                                    }

                                    // Zielpfad, Filename und Subfolder ermitteln
                                    let target;
                                    let targetPath = absolutPathPrefix + '/' + config.resizer.target;
                                    let subFolder = "";
                                    let targetFilename = "";

                                    // SubFolder check
                                    let subFoldersEndIndex = filename.lastIndexOf('/');
                                    if (subFoldersEndIndex > -1) {
                                        subFolder = filename.substring(0, subFoldersEndIndex);
                                    }

                                    if (utils.typechecks.isTrue(config.resizer.options.createFolders)) {
                                        targetPath += '/' + dimensionKey;
                                    }

                                    if (subFoldersEndIndex > -1) {
                                        targetFilename = filename.substring(subFoldersEndIndex, indexExtension);
                                    }
                                    else {
                                        targetFilename = filename.substring(0, indexExtension);
                                    }

                                    if (utils.typechecks.isFalse(config.resizer.options.createFolders)) {
                                        targetFilename += '_';
                                        targetFilename += dimensionKey;
                                        targetFilename += filename.substring(indexExtension);
                                    }

                                    if (utils.typechecks.isNumeric(dimension.width)) {
                                        resizerOptions['width'] = dimension.width;
                                    }
                                    if (utils.typechecks.isNumeric(dimension.height)) {
                                        resizerOptions['height'] = dimension.height;
                                    }

                                    targetPath += '/' + subFolder;

                                    if (!fs.existsSync(targetPath) ) {
                                        fs.mkdirSync(targetPath);
                                    }
                                    console.log('targetPath: ' + targetPath );
                                    target = targetPath + '/' + targetFilename;
                                    console.log('target : ' + target);

                                    resizeImage(fs.readFileSync(file), resizerOptions).then(buf => {
                                        fs.writeFileSync(target, buf);
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    callback();
}
