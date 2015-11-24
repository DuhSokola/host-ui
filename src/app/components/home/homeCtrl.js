;(function () {
    'use strict';

    var dependencies = [
        'hostApp.customerResource'
    ];

    var homeCtrl = angular.module('hostApp.home.ctrl', dependencies);

    homeCtrl.controller('HomeCtrl', ['$scope', function ($scope) {
    }]);

    homeCtrl.controller('LoginCtrl', ['$scope','$location','CustomerResource', function ($scope,$location) {
        $scope.formIsSubmitted = false;
        $scope.formIsValid = false;

        $scope.hostName = undefined;
        $scope.selectedCarBrand = undefined;
        $scope.selectedCampaign = undefined;

        $scope.titles = [ "Max Muster" , "Alex Stanly" , "Fax Morgan" , "Michael Mainstream" , "Sandra Brox" ];

        $scope.submit = function(){
            $scope.formIsSubmitted = true;

            if($scope.hostName && $scope.selectedCarBrand && $scope.selectedCampaign){
                $scope.formIsValid = true;
            }else{
                $scope.formIsValid = false;
            }

            if (!_.contains($scope.titles,$scope.hostName)){
                $scope.titles.push($scope.hostName);
            }

            //Pass data to global "dataCollector" scope
            if($scope.formIsValid){
                $scope.globals.hostData = {
                    hostName: $scope.hostName,
                    carBrand: $scope.selectedCarBrand,
                    campaign: $scope.selectedCampaign
                };
                $scope.globals.printAllGlobals();
                $location.path('/catalog');
            }

            console.log('HostName is: ' + $scope.hostName);
            console.log('CarBrand is: ' + (($scope.selectedCarBrand) ? $scope.selectedCarBrand.name : undefined));
            console.log('Campaign is: ' + (($scope.selectedCampaign) ? $scope.selectedCampaign.name : undefined));
            console.log('Form is valid: ' + $scope.formIsValid);
        }
    }]);

    homeCtrl.controller('SelectBrandCtrl', ['$scope', '$translate', function ($scope, $translate) {
        $scope.disabled = undefined;

        $scope.enable = function () {
            $scope.disabled = false;
        };

        $scope.disable = function () {
            $scope.disabled = true;
        };

        $scope.selectedCarBrand = {};
        $scope.carBrands = [];

        $translate(['CAR_AUDI_SELECT', 'CAR_SEAT_SELECT', 'CAR_SKODA_SELECT', 'CAR_VW_SELECT']).then(function (translation) {
            //TODO External config?
            $scope.carBrands = [
                {
                    id: 'car_audi',
                    name: translation['CAR_AUDI_SELECT']
                },
                {
                    id: 'car_seat',
                    name: translation['CAR_SEAT_SELECT']
                },
                {
                    id: 'car_skoda',
                    name: translation['CAR_SKODA_SELECT']
                },
                //TODO VW as default? (dont forget passOnParent)
                {
                    id: 'car_vw',
                    name: translation['CAR_VW_SELECT']
                }
            ];
        });

        $scope.passOnParentScope = function(model){
            $scope.$parent.selectedCarBrand = model;
        }
    }]);

    homeCtrl.controller('SelectCampaignCtrl', ['$scope', '$translate', function ($scope, $translate) {



        $scope.disabled = undefined;

        $scope.enable = function () {
            $scope.disabled = false;
        };

        $scope.disable = function () {
            $scope.disabled = true;
        };

        $scope.selectedCampaign = {};
        $scope.campaigns = [];

        $translate(['CAMPAIGN_GENEVA_SELECT', 'CAMPAIGN_ZURICH_SELECT']).then(function (translation) {
            //TODO External config? Dynamic "name"?(translation['CAMPAIGN_GENEVA_SELECT'] + year)
            $scope.campaigns = [
                {
                    id: 'campaign_geneva',
                    year: '2016',
                    name: translation['CAMPAIGN_GENEVA_SELECT']
                },
                {
                    id: 'campaign_zurich',
                    year: '2016',
                    name: translation['CAMPAIGN_ZURICH_SELECT']
                }
            ];
            $scope.selectedCampaign.selected = $scope.campaigns[0];
            $scope.$parent.selectedCampaign = $scope.selectedCampaign.selected;
        });

        $scope.passOnParentScope = function(model){
            $scope.$parent.selectedCampaign = model;
        }
    }]);
}());