;(function() {
    'use strict';

    var deps = [
        'hostApp.constants',
        'hostApp.routes',
        'LocalStorageModule',
        'ngSanitize',
        'pascalprecht.translate',
        'hostApp.customerResource'
    ];

    var app = angular.module('hostApp', deps);

    app.config(function ($translateProvider,localStorageServiceProvider) {

        /**
         * Setup local storage
         */
        localStorageServiceProvider.setPrefix('hostApp');
        localStorageServiceProvider.setStorageType('localStorage');
        localStorageServiceProvider.setStorageCookie(0, '/');

        /**
         * Translations
         */
        $translateProvider.useSanitizeValueStrategy('sanitize');
        $translateProvider.useStaticFilesLoader({
            prefix: '../assets/i18n/lang-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('de_CH');
    });

    app.run(function () {

    });


    /**
     * Example to switch language
     */
    app.controller('hostAppCtrl',['$translate','LANGUAGE','CustomerResource', function($translate,LANGUAGE){
        $translate.use(LANGUAGE.ENGLISH);
    }]);

}());
