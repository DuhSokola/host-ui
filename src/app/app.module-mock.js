;(function() {
    'use strict';

    var deps = [
        'hostApp.constants',
        'hostApp.routes',
        'LocalStorageModule',
        'ngSanitize',
        'pascalprecht.translate',
        'ngMockE2E'
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

    app.run(function($httpBackend){
        $httpBackend.when('GET', '/api/customers').respond(function(method, url, data){
            return [200, data];
        });
        $httpBackend.when('GET', '/api/catalogs').respond(function(method, url, data){
            return [200, data];
        });
        $httpBackend.when('GET', '/api/hosts').respond(function(method, url, data){
            return [200, data];
        });

        $httpBackend.whenGET(/\.html$/).passThrough();
        $httpBackend.whenGET(/\.json$/).passThrough();
       /* $httpBackend.whenGET('http://localhost:3000/browser-sync/').passThrough();
        $httpBackend.whenPOST('http://localhost:3000/browser-sync/').passThrough();
        $httpBackend.whenPOST('http://localhost:3001/').passThrough();*/

    });

    /**
     * Example to switch language
     */
    app.controller('hostAppCtrl',['$translate','LANGUAGE','CustomerResource', function($translate,LANGUAGE){
        $translate.use(LANGUAGE.ENGLISH);
    }]);

}());
