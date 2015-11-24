;(function() {
    'use strict';

    var deps = [
        'hostApp.constants',
        'hostApp.routes',
        'LocalStorageModule',
        'ngSanitize',
        'pascalprecht.translate',
        'hostApp.customerResource',
        'ui.select'
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
        $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
        $translateProvider.useStaticFilesLoader({
            prefix: '../assets/i18n/lang-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('de_CH');
    });

    app.run(function ($templateCache) {
        /*
        TODO
        Definieren obs notwendig ist
         */
        //$templateCache.put("selectize/select.tpl.html","<div class=\"ui-select-container selectize-control single\" ng-class=\"{\'open\': $select.open}\"><div class=\"selectize-input\" ng-class=\"{\'focus\': $select.open, \'disabled\': $select.disabled, \'selectize-focus\' : $select.focus}\" ng-click=\"$select.activate()\"><div class=\"ui-select-match\"></div><input type=\"text\" autocomplete=\"false\" tabindex=\"-1\" class=\"ui-select-search ui-select-toggle\" ng-click=\"$select.toggle($event)\" placeholder=\"{{$select.placeholder}}\" ng-model=\"$select.search\" ng-hide=\"($select.selected && !$select.open)\" ng-disabled=\"$select.disabled\" aria-label=\"{{ $select.baseTitle }}\"></div><div class=\"ui-select-choices\"></div></div>");
    });


    /**
     * Example to switch language
     */
    app.controller('hostAppCtrl',['$scope', function($scope){
        $scope.globals = {};
        $scope.globals.hostData = undefined;
        $scope.globals.cutomerData = undefined;

        $scope.globals.printAllGlobals = function() {
            console.log('---===START GLOBALS===---');
            console.log($scope.globals.hostData);
            console.log($scope.globals.cutomerData);
            console.log('---===END GLOBALS===---');
        }
    }]);

}());
