'use strict';

/* App Module */

var EiskaltApp = angular.module('EiskaltApp', ['ngRoute', 'ngStorage', 'ui.bootstrap', 'EiskaltRPC', 'EiskaltFilters']);

EiskaltApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/hubs', {controller: 'HubsCtrl', templateUrl: 'partials/hubs.html'})
        .when('/share', {controller: 'ShareCtrl', templateUrl: 'partials/share.html'})
        .otherwise({redirectTo: '/hubs'});
}]);


/* Controllers */
EiskaltApp.controller('MainCtrl', function($scope, $location, $interval, EiskaltRPC) {
	$scope.isActive = function(route) {
        return route === $location.path();
    }
    $scope.pauseHash = function() {
        EiskaltRPC.PauseHash().success(function(data) {
            console.log(data);
            $scope.refreshData()
        });
    }

    EiskaltRPC.ShowVersion().success(function(data) {
        $scope.version = data;
    });

    $scope.refreshData = function() {
        EiskaltRPC.GetHashStatus().success(function(data) {
            $scope.hashing = data;
        });
        EiskaltRPC.ShowRatio().success(function(data) {
            $scope.ratio = data;
        });
    }
    $scope.refreshData();
    $interval($scope.refreshData, 5000);
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

EiskaltApp.controller('HubCtrl', function($scope, $interval, $localStorage, EiskaltRPC) {
    $scope.hub = $scope.$parent.hub;

    EiskaltRPC.GetHubUserList($scope.hub.huburl).success(function(users) {
        $scope.users = [];
        angular.forEach(users, function(user) {
            EiskaltRPC.GetUserInfo(user, $scope.hub.huburl).success(function(data) {
                $scope.users.push(data);
            });
        });
    });

    // Chat
    $scope.$storage = $localStorage.$default({
        chatlog: {}
    });
    if (angular.isUndefined($scope.$storage.chatlog[$scope.hub.huburl])) {
        $scope.$storage.chatlog[$scope.hub.huburl] = [];
    }
    $scope.refreshChat = function() {
        EiskaltRPC.GetChatPub($scope.hub.huburl).success(function(messages) {
            angular.forEach(messages, function(message) {
                $scope.$storage.chatlog[$scope.hub.huburl].push({
                    time: new Date(),
                    text: message
                });
            })
        });
    };
    $scope.refreshChat();
    $interval($scope.refreshChat, 5000);

    $scope.newChatMessage = '';
    $scope.sendChatMessage = function() {
        EiskaltRPC.HubSay($scope.hub.huburl, $scope.newChatMessage);
        $scope.newChatMessage = '';
        $scope.refreshChat();
    }
});

EiskaltApp.controller('ShareCtrl', function($scope, EiskaltRPC) {
    EiskaltRPC.ListShare().success(function(data) {
        console.log(data);
    });
});