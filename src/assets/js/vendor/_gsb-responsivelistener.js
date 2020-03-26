'use strict';

/*!
 * @name responsiveListener
 * @author @anuebel/pespeloe
 * Licensed under the MIT license
 *
 * Callback function je Breakpoint
 * */
;
(function ($) {
    if (!$.gsb) {
        $.gsb = {};
    }
    ;

    $.gsb.responsiveListener = function (pluginBase) {
        var base = this;
        this.base = base;
        this.pluginBase = pluginBase;

        // Add a reverse reference to the DOM object
        this.base.breakpoints = [];
        this.base.breakpointSettings = [];
        this.base.activeBreakpoint = null;
        this.base.windowWidth = 0;

        base.init = function () {
            //Da die Lib keine eigenen Options hat, Options vom Plugin holen
            base.options = pluginBase.options;
            base.originalOptions = base.options;
            this.base.options = base.options;
            this.base.originalOptions = base.originalOptions;
            base.initResponsive();
            base.checkResponsive();
            if (base.options.respondToEvents === true) {
                base.initEvents();
            }
        };

        /**
         * Initialisiert die Events.
         */
        $.gsb.responsiveListener.prototype.initEvents = function () {
            var $window = $(window),
                onResize = function () {
                    if ($(window).width() !== base.windowWidth) {
                        clearTimeout(base.windowDelay);
                        base.windowDelay = window.setTimeout(function () {
                            base.windowWidth = $(window).width();
                            base.checkResponsive();
                        }, 100);
                    }
                };
            $window.on('resize', onResize);
            $window.on('orientationchange', function () {
                base.checkResponsive();
            });
        };

        // Run initializer
        base.init();
    };

    /**
     * Initialisiert die Datenstrukturen fuer die responsiven Ueberpruefungen.
     */
    $.gsb.responsiveListener.prototype.initResponsive = function () {
        var breakpoint,
            responsiveSettings = this.base.options.responsive || null;

        if (responsiveSettings && responsiveSettings.length > -1) {
            for (breakpoint in responsiveSettings) {
                if (responsiveSettings.hasOwnProperty(breakpoint)) {
                    this.base.breakpoints.push(responsiveSettings[
                        breakpoint].breakpoint);
                    this.base.breakpointSettings[responsiveSettings[
                        breakpoint].breakpoint] =
                        responsiveSettings[breakpoint];
                }
            }
            this.base.breakpoints.sort(function (a, b) {
                return b - a;
            });
        }
    };

    /**
     * Ueberprueft, ob eine Aenderung der Einstellungen durchgefuehrt werden muss. Dies ist dann der Fall, wenn
     * sich  die Breite des Viewports(window-Objekt) geaendert hat und mindestens einen der angegebenen Breakpoints
     * unterschreitet. Ausschlaggebend fuer die Aenderungen ist der letzte konfigurierte Breakpoint, dessen Breite
     * unterschritten wird.
     *
     */
    $.gsb.responsiveListener.prototype.checkResponsive = function () {
        var breakpoint,
            targetBreakpoint,
            respondToWidth = window.innerWidth || $(window).width();

        if (this.base.originalOptions.responsive &&
            this.base.originalOptions.responsive.length > -1 &&
            this.base.originalOptions.responsive !== null) {

            targetBreakpoint = null;

            if (this.base.activeBreakpoint !== null && respondToWidth >= this.base.breakpoints[0]) {
                this.base.activeBreakpoint = null;
                this.pluginBase.options = this.base.originalOptions;
            }

            for (breakpoint in this.base.breakpoints) {
                if (this.base.breakpoints.hasOwnProperty(breakpoint)) {
                    if (respondToWidth < this.base.breakpoints[breakpoint]) {
                        targetBreakpoint = this.base.breakpoints[breakpoint];
                        this.base.highestResolution = false;
                    }
                }
            }

            if (this.base.highestResolution) {
                return;
            }

            if (targetBreakpoint !== null) {
                if (this.base.activeBreakpoint !== null) {
                    if (targetBreakpoint !== this.base.activeBreakpoint) {
                        this.base.activeBreakpoint = targetBreakpoint;
                        this.pluginBase.options = $.extend({},
                            this.base.originalOptions,
                            this.base.breakpointSettings[targetBreakpoint]);
                        this.base.triggerRefresh();
                    }
                } else {
                    this.base.activeBreakpoint = targetBreakpoint;
                    this.pluginBase.options = $.extend({},
                        this.base.originalOptions,
                        this.base.breakpointSettings[targetBreakpoint]);
                    this.base.triggerRefresh();
                }
            } else {
                if (this.base.activeBreakpoint !== null) {
                    this.base.activeBreakpoint = null;
                    this.base.options = this.base.originalOptions;
                    this.base.triggerRefresh();
                } else {
                    this.base.highestResolution = true;
                    this.base.triggerRefresh();
                }
            }
        } else if (this.base.originalOptions.onRefresh &&
            this.base.originalOptions.onRefresh.length > -1 &&
            this.base.originalOptions.onRefresh !== null) {
            if (this.base.highestResolution) {
                return;
            }
            this.base.triggerRefresh();
            this.base.highestResolution = true;
        }
    };

    /**
     * Loest die Aktualisierung des Scripts aus.
     */
    $.gsb.responsiveListener.prototype.triggerRefresh = function () {
        if (typeof this.pluginBase.options.onRefresh === 'function') {
            this.pluginBase.options.onRefresh.call(this.pluginBase);
        }
    };

    $.fn.gsb_responsiveListener = function (pluginBase) {
        return this.each(function () {
            (new $.gsb.responsiveListener(pluginBase));
        });
    };
})(jQuery);