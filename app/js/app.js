'use strict';

/* App Module */

var EiskaltApp = angular.module('EiskaltApp', ['ngRoute', 'ui.bootstrap', 'EiskaltRPC']);

EiskaltApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/hubs', {controller: 'HubCtrl', templateUrl: 'partials/hubs.html'})
        .otherwise({redirectTo: '/hubs'});
}]);


/* Controllers */
EiskaltApp.controller('MainCtrl', ['$scope', 'EiskaltRPC', function($scope, EiskaltRPC) {
	EiskaltRPC.ShowVersion().success(function(data) {
        $scope.version = data;
    });
}]);

EiskaltApp.controller('HubCtrl', ['$scope', 'EiskaltRPC', function($scope, EiskaltRPC) {
    EiskaltRPC.ListHubsFullDesc().success(function(data) {
        $scope.hubs = data;
    });
}]);
