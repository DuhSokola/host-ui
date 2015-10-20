;(function(){
    'use strict';

    var deps = [
        'ngResource'
    ];

    var customerResource = angular.module('hostApp.customerResource',deps);

    customerResource.factory('Customer',['$resource',function($resource){
        return $resource('http://localhost:3001/api/customers/:id');
    }]);

    customerResource.factory('CustomerResource',['Customer', function(Customer){
        var getAll = function(success,error){
            return Customer.query(success,error);
        };

        C

        var getById = function(id, success,error){
            return Customer.get({'id': id},success,error);
        };

        var getWhere = function(query, success, error){
            return Customer.query({filter:{where:query}},success,error);
        };

        var save = function(data, success,error){
            var customer = new Customer();
            customer.name=data.name;
            customer.prename=data.prename;
            customer.email=data.email;
            return customer.$save().then(success).catch(error);
        };

        return {
            getAll: getAll,
            getById: getById,
            getWhere: getWhere,
            save: save
        };
    }]);

}());