;(function(){
    'use strict';

    var dependencies = [
        'ngRoute'
    ]

    var route = angular.module('routeConfig',dependencies);

    route.config(function($routeProvider){
        console.log("asd2");
    });
}());