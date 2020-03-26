'use strict';

/*!
 * @name TODO_MODULENAME
 * @author @boelenbe
 * @description
 */
;(function ($) {
    if (!$.modules) {
        $.modules = {};
    }

    $.modules. < TODO_MODULENAME > = function (el, options) {
        // To avoid scope issues, use 'base' instead of 'this' to reference this class from internal events / functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data("modules.<TODO_MODULENAME>", base);

        /*
         * Initializer function for this module
         */
        base.init = function () {
            base.options = $.extend({}, $.modules. < TODO_MODULENAME >.defaultOptions, options
        )
            ;

            // modul specific magic ...

        };

        // call initializer
        base.init();
    };

    $.modules. < TODO_MODULENAME >
.
    defaultOptions = {};

    // Search Reset
    $.fn.module_ < TODO_MODULENAME > = function (options) {
        return this.each(function () {
            (new $.modules. < TODO_MODULENAME > (this, options));
        });
    };

})(jQuery);

//
// $("#topbar").module_<TODO_MODULENAME>();