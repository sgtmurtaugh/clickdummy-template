var typechecks = require('../../gulp/functions/type-checks');

/**
 * hlp_virtualSize
 * @param vsize
 * @param voffset
 * @param options
 * <p>TODO
 */
module.exports = function(vsize, voffset, options) {
    let METHOD = "virtualSize(vsize, voffset, options)";

    let vx = 0;

    // vsize check
    if (typechecks.isNumeric(vsize)) {
        vx = parseFloat(vsize);

        // voffset check
        if (typechecks.isNumeric(voffset)) {
            vx += parseFloat(voffset);
        }
    }

    // 2. Ungueltige Werte werden durch 0 ersetzt, damit diese ignoriert werden
    if ((vx < 0)
            || (vx > 6)) {
        vx = 0;
    }

    // return options.fn(this);
    return vx;
};