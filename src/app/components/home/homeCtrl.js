;(function(){
    'use strict';

    var dependencies = [
        'hostApp.customerResource'
    ];

    var homeCtrl = angular.module('hostApp.home.ctrl',dependencies);

    homeCtrl.controller('HomeCtrl',['$scope',function($scope){

    }]);

    homeCtrl.controller('SaveFormCtrl',['$scope','CustomerResource', function($scope,CustomerResource){
        $scope.name='';
        $scope.prename='';
        $scope.email='';

        $scope.sendData = function(){
            if(navigator.onLine){
                console.log("IS ONLINE");
            }else {
                console.log("OFFLINE");
            }

            CustomerResource.save(
                {
                    'name':$scope.name,
                    'prename':$scope.prename,
                    'email':$scope.email
                }
            );

        };
    }]);

    homeCtrl.controller('GetFormCtrl',['$scope','CustomerResource', function($scope,CustomerResource){
        $scope.name='';
        $scope.prename='';
        $scope.email='';

        $scope.getData = function(){
            CustomerResource.getWhere(
                {
                    name:$scope.name
                }
            );

        };
    }]);

}());