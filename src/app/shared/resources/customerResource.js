;(function(){
    'use strict';

    var deps = [
        'ngResource'
    ];

    var customerResource = angular.module('hostApp.customerResource',deps);

    customerResource.factory('Customer',['$resource',function($resource){
        return $resource('/api/customers/:id');
    }]);

    customerResource.factory('CustomerResource',['Customer', function(Customer){
        var getAll = function(success,error){
            return Customer.query(success,error);
        };

        return {
            getAll: getAll
        };
    }]);

/*
    customerResource.controller('CustomerResourceCtrl',['$scope','Customer',function($scope,Customer){
        var customer = Customer.get({ id: $scope.id }, function() {
            console.log(customer);
        }); // get() returns a single entry

        var customers = Customer.query(function() {
            console.log(customers);
        }); //query() returns all the entries

        $scope.customer = new Customer(); //You can instantiate resource class

        $scope.customer.data = 'some data';

        Customer.save($scope.customer, function() {
            //data saved. do something here.
        }); //saves an entry. Assuming $scope.entry is the Entry object

    }]);*/

}());