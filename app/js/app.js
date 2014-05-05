'use strict';

/* App Module */

var EiskaltApp = angular.module('EiskaltApp', ['ngRoute', 'ui.bootstrap', 'EiskaltRPC']);

EiskaltApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/hubs', {controller: 'HubsCtrl', templateUrl: 'partials/hubs.html'})
        .when('/share', {controller: 'ShareCtrl', templateUrl: 'partials/share.html'})
        .otherwise({redirectTo: '/hubs'});
}]);


/* Controllers */
EiskaltApp.controller('MainCtrl', function($scope, $location, EiskaltRPC) {
	$scope.isActive = function(route) {
        return route === $location.path();
    }
    EiskaltRPC.ShowVersion().success(function(data) {
        $scope.version = data;
    });
    EiskaltRPC.GetHashStatus().success(function(data) {
        console.log(data);
        $scope.hashing = data;
    });

});

EiskaltApp.controller('HubsCtrl', function($scope, EiskaltRPC) {
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
});

EiskaltApp.controller('HubCtrl', function($scope, EiskaltRPC) {
    $scope.hub = $scope.$parent.hub;
//    EiskaltRPC.GetHubUserList($scope.hub).success(function(data) {
//        $scope.users = data;
//    });

    console.log();

    EiskaltRPC.GetHubUserList($scope.hub.huburl).success(function(data) {
        console.log(data);
    });
});

EiskaltApp.controller('ShareCtrl', function($scope, EiskaltRPC) {
    EiskaltRPC.RefreshShare().success(function(data) {
        console.log(data);
    });
});