'use strict';

/*!
 * @name TODO component_XY
 * @author @ckraus
 * @description
 */
;(function ($) {
    if (!$.components) {
        $.components = {};
    }

    $.components.component_XY = function (el, options) {
        // To avoid scope issues, use 'base' instead of 'this' to reference this class from internal events / functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data("components.component_XY", base);

        /*
         * Initializer function for this module
         */
        base.init = function () {
            base.options = $.extend({}, $.components.component_XY.defaultOptions, options
        )
            ;

            // modul specific magic ...

        };

        // call initializer
        base.init();
    };

    $.components.component_XY.defaultOptions = {};

    // Search Reset
    $.fn.module_component_XY = function (options) {
        return this.each(function () {
            (new $.components.component_XY(this, options));
        });
    };

})(jQuery);

$("body").component_XY();