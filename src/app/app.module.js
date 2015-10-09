;(function() {
    'use strict';

    var dependencies = [,
        'ngSanitize',
        'pascalprecht.translate',
        'hostApp.routes',
        'hostApp.constants'
    ];

    var app = angular.module('hostApp', dependencies);

    app.run(function () {

    });

    app.config(function ($translateProvider) {
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

    app.controller('hostAppCtrl',['$translate','LANGUAGE', function($translate,LANGUAGE){
        $translate.use(LANGUAGE.ENGLISH);
    }]);

}());
