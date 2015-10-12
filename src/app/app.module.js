;(function() {
    'use strict';

    var deps = [
        'ngSanitize',
        'pascalprecht.translate',
        'hostApp.constants',
        'hostApp.routes',
        'LocalStorageModule'
    ];

    var app = angular.module('hostApp', deps);

    app.config(function ($translateProvider,localStorageServiceProvider) {

        localStorageServiceProvider.setPrefix('hostApp');
        localStorageServiceProvider.setStorageType('localStorage');
        localStorageServiceProvider.setStorageCookie(0, '/');

        /**
         * Translations
         */
        $translateProvider.useSanitizeValueStrategy('sanitize');
        $translateProvider.useStaticFilesLoader({
            prefix: '../resources/i18n/lang-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('de_CH');
    });

    app.run(function () {

    });


    /**
     * Example to switch language
     */
    app.controller('hostAppCtrl',['$translate','LANGUAGE', function($translate,LANGUAGE){
        $translate.use(LANGUAGE.ENGLISH);
    }]);

}());
