'use strict';

/* App Module */

var EiskaltApp = angular.module('EiskaltApp', ['ngRoute', 'ui.bootstrap', 'EiskaltRPC']);

EiskaltApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/hubs', {controller: 'HubsCtrl', templateUrl: 'partials/hubs.html'})
        .otherwise({redirectTo: '/hubs'});
}]);


/* Controllers */
EiskaltApp.controller('MainCtrl', ['$scope', '$location', 'EiskaltRPC', function($scope, $location, EiskaltRPC) {
	EiskaltRPC.ShowVersion().success(function(data) {
        $scope.version = data;
        $scope.path = $location.path();
    });
}]);

EiskaltApp.controller('HubsCtrl', ['$scope', 'EiskaltRPC', function($scope, EiskaltRPC) {
    var loadHubs = function() {
        EiskaltRPC.ListHubsFullDesc().success(function(data) {
            $scope.hubs = data;
        });
    };
    loadHubs();

    $scope.newHubUrl = 'adc://';
    $scope.connect = function(newHubUrl) {
        EiskaltRPC.HubAdd(newHubUrl).success(loadHubs);
    };

    $scope.disconnect = function(huburl) {
        EiskaltRPC.HubDel(huburl).success(loadHubs);
    };
}]);

EiskaltApp.controller('HubCtrl', ['$scope', 'EiskaltRPC', function($scope, EiskaltRPC) {
    $scope.hub = $scope.$parent.hub;
//    EiskaltRPC.GetHubUserList($scope.hub).success(function(data) {
//        $scope.users = data;
//    });
}]);
