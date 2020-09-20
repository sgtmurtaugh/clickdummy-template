'use strict';

/*!
 * @name TODO module_XY
 * @author @ckraus
 * @description
 */
;(function ($) {
    if (!$.modules) {
        $.modules = {};
    }

    $.modules.module_XY = function (el, options) {
        // To avoid scope issues, use 'base' instead of 'this' to reference this class from internal events / functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data("modules.module_XY", base);

        /*
         * Initializer function for this module
         */
        base.init = function () {
            base.options = $.extend({}, $.modules.module_XY.defaultOptions, options);

            // modul specific magic ...

        };

        // call initializer
        base.init();
    };

    $.modules.module_XY.defaultOptions = {};

    // Search Reset
    $.fn.module_module_XY = function (options) {
        return this.each(function () {
            (new $.modules.module_XY(this, options));
        });
    };

})(jQuery);

$("body").module_XY();