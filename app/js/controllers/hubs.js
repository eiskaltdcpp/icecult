'use strict';

EiskaltApp.controller('HubsCtrl', function ($scope, EiskaltRPC) {
    var loadHubs = function () {
        EiskaltRPC.ListHubsFullDesc().success(function (data) {
            $scope.$root.hubs = data;
        });
    };
    loadHubs();

    $scope.connect = function (newHubUrl) {
        if (!angular.isUndefined(newHubUrl) && newHubUrl.length > 3) {
            EiskaltRPC.HubAdd(newHubUrl).success(loadHubs);
        }
    };

    $scope.disconnect = function (huburl) {
        EiskaltRPC.HubDel(huburl).success(loadHubs);
    };
});

EiskaltApp.controller('HubCtrl', function ($scope, $interval, $localStorage, EiskaltRPC) {
    $scope.hub = $scope.$parent.hub;

    EiskaltRPC.GetHubUserList($scope.hub.huburl).success(function (users) {
        $scope.users = [];
        angular.forEach(users, function (user) {
            EiskaltRPC.GetUserInfo(user, $scope.hub.huburl).success(function (data) {
                $scope.users.push(data);
            });
        });
    });
    // initialize localStorage for chatlog per hub
    $scope.$storage = $localStorage.$default({chatlog: {}});
    if (angular.isUndefined($scope.$storage.chatlog[$scope.hub.huburl])) {
        $scope.$storage.chatlog[$scope.hub.huburl] = [];
    } else {
        // clean old messages
        $scope.$storage.chatlog[$scope.hub.huburl] = $scope.$storage.chatlog[$scope.hub.huburl].slice(-250);
    }
    $scope.refreshChat = function () {
        EiskaltRPC.GetChatPub($scope.hub.huburl).success(function (messages) {
            angular.forEach(messages, function (message) {
                $scope.$storage.chatlog[$scope.hub.huburl].push({
                    time: new Date(),
                    text: message
                });
            })
        });
    };
    $scope.refreshChat();
    $interval($scope.refreshChat, REFRESH['hub_chat']);

    $scope.newChatMessage = '';
    $scope.sendChatMessage = function () {
        EiskaltRPC.HubSay($scope.hub.huburl, $scope.newChatMessage).success(function(data) {
            $scope.newChatMessage = '';
            $scope.refreshChat();
        });
    }

    $scope.getFilelist = function (nick) {
        EiskaltRPC.GetFileList($scope.hub.huburl, nick);
    }
});