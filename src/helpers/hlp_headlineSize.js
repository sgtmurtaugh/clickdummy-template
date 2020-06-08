var typechecks = require('../../lib/typechecks');

/**
 * headlineSize
 * @param hsize
 * @param offset
 * @param defaultHsize
 * @param options
 * <p>TODO
 */
module.exports = function(hsize, offset, defaultHsize, options) {
    let METHOD = "headlineSize(hsize, offset, defaultHsize, options)";

    let hx = 0;

    // 1. hsize / defaultHsize check
    if (typechecks.isNumeric(hsize)) {
        hx = parseFloat(hsize);
    }
    else if (typechecks.isNumeric(defaultHsize)) {
        hx = parseFloat(defaultHsize);
    }

    // 2. Offset calc
    if ((hx > 0)
            && (typechecks.isNumeric(offset))) {

        hx += parseFloat(offset);
    }

    // 3. Ungueltige Werte werden durch 0 ersetzt, damit sie als P-Tag gerendert werden
    if ((hx < 0)
            || (hx > 6)) {
        hx = 0;
    }

    // return options.fn(this);
    return hx;
};