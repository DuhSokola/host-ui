;(function(){
    'use strict';

    var deps = [
        'ui.router',
        'hostApp.home',
        'hostApp.catalog'
    ];

    var route = angular.module('hostApp.routes',deps);

    route.config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'app/components/home/_home.html',
                controller: 'HomeCtrl'
            })
            .state('catalog', {
                url: '/catalog',
                templateUrl: 'app/components/catalog/_catalog.html',
                controller: 'CatalogCtrl'
            })
            .state('search', {
                url: '/search',
                templateUrl: 'app/components/search/_search.html',
                controller: 'SearchCtrl'
            })
            .state('customer', {
                url: '/customer',
                templateUrl: 'app/components/customer/_customer.html',
                controller: 'CustomerCtrl'
            });

    });

}());