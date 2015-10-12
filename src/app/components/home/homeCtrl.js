;(function(){
    'use strict';

    var dependencies = [];

    var homeCtrl = angular.module('hostApp.home.ctrl',dependencies);

    homeCtrl.controller('HomeCtrl',['$scope',function($scope){

    }]);

    homeCtrl.controller('FormCtrl',['$scope', function($scope){
        $scope.name='';
        $scope.prename='';
        $scope.email='';

        $scope.sendData = function(){
            if(navigator.onLine){
                console.log($scope.name);
                console.log($scope.prename);
                console.log($scope.email);
            }else{
                console.log("OFF");
            }
        };
    }]);

}());