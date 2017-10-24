/* Copyright (c) 2017 Lars Kreisz */
/* License:The MIT License (MIT) */

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

EiskaltApp.controller('HubCtrl', function ($scope, $interval, $localStorage, settings, EiskaltRPC, DesktopNotification) {
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
        $scope.$storage.chatlog[$scope.hub.huburl] = $scope.$storage.chatlog[$scope.hub.huburl].slice(
            -1 * settings.chatMessagesKept
        );
    }
    $scope.refreshChat = function () {
        EiskaltRPC.GetChatPub($scope.hub.huburl).success(function (messages) {
            if (messages.length > 0) {
                DesktopNotification.notifyChat($scope.hub, messages);
                Array.prototype.push.apply($scope.$storage.chatlog[$scope.hub.huburl], messages);
            }
        });
    };
    $scope.refreshChat();
    var refreshChatTimer = $interval($scope.refreshChat, settings.refresh.chat);
    $scope.$on("$destroy", function(event) {
        $interval.cancel(refreshChatTimer);
    });

    $scope.newChatMessage = '';
    $scope.sendChatMessage = function () {
        EiskaltRPC.HubSay($scope.hub.huburl, $scope.newChatMessage).success(function(data) {
            $scope.refreshChat();
        });
        $scope.newChatMessage = '';
    };
});

EiskaltApp.controller('UserCtrl', function ($scope, EiskaltRPC) {
    $scope.downloading = false;

    $scope.downloadFilelist = function (nick) {
        EiskaltRPC.GetFileList($scope.hub.huburl, nick).success(function(status) {
            if (status == 0) {
                $scope.downloading = true;
            } else {
                alert('Download failed. Maybe still downloading or downloaded already?');
            }
        });
    };
});
