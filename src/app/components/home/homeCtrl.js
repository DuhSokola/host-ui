;(function(){
    'use strict';

    var dependencies = [
        'hostApp.customerResource'
    ];

    var homeCtrl = angular.module('hostApp.home.ctrl',dependencies);

    homeCtrl.controller('HomeCtrl',['$scope',function($scope){
    }]);

    homeCtrl.controller('LoginCtrl',['$scope','CustomerResource', function($scope,CustomerResource){

    }]);

    homeCtrl.controller('SelectBrand',['$scope', '$translate', function($scope,$translate) {
        $scope.disabled = undefined;

        $scope.enable = function() {
            $scope.disabled = false;
        };

        $scope.disable = function() {
            $scope.disabled = true;
        };

        $scope.clear = function() {
            $scope.country.selected = undefined;
        };

        $scope.selectedCarBrand = {};
        $scope.carBrands = [];

        $translate(['AUDI_SELECT','SEAT_SELECT', 'SKODA_SELECT', 'VW_SELECT']).then(function (translation) {
            $scope.carBrands = [
                {name:translation['AUDI_SELECT']},
                {name:translation['SEAT_SELECT']},
                {name:translation['SKODA_SELECT']},
                {name:translation['VW_SELECT']}
            ];
            //TODO Brauchts VW as default?
        });
    }]);


    homeCtrl.directive('ui-select-wrapper',function(){
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: '<div class="my-div" style="background-color:red" ng-transclude></div>'
        }
    });
}());