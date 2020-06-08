/**
 * concat
 * @param args
 * <p>TODO
 */
module.exports = function(...args) {
    let METHOD = "concat(args)";

    return args.slice(0, -1).join(' ');
};