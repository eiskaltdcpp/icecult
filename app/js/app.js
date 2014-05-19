'use strict';

/* App Module */
var REFRESH = {
    'hash_ratio': 10000,
    'hub_chat': 10000,
    'queues': 10000
}

var EiskaltApp = angular.module('EiskaltApp', ['ngRoute', 'ngStorage', 'ngSanitize', 'luegg.directives', 'ui.bootstrap',
                                               'angularBootstrapNavTree', 'EiskaltRPC', 'ShareBrowser', 'EiskaltFilters']);

EiskaltApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/hubs', {
            controller: 'HubsCtrl',
            templateUrl: 'partials/hubs.html'
        })
        .when('/browse', {
            controller: 'BrowseCtrl',
            templateUrl: 'partials/browse.html'
        })
        .when('/queue', {
            controller: 'QueueCtrl',
            templateUrl: 'partials/queue.html'
        })
        .otherwise({redirectTo: '/hubs'});
}]);


/* Controllers */
EiskaltApp.controller('MainCtrl', function ($scope, $location, $interval, EiskaltRPC) {
    $scope.isActive = function (route) {
        return route === $location.path();
    }
    $scope.pauseHash = function () {
        EiskaltRPC.PauseHash().success(function (data) {
            $scope.refreshData()
        });
    }

    EiskaltRPC.ShowVersion().success(function (data) {
        $scope.version = data;
    });

    $scope.refreshData = function () {
        EiskaltRPC.GetHashStatus().success(function (data) {
            $scope.hashing = data;
        });
        EiskaltRPC.ShowRatio().success(function (data) {
            $scope.ratio = data;
        });
    }
    $scope.refreshData();
    $interval($scope.refreshData, REFRESH['hash_ratio']);
});

EiskaltApp.controller('HubsCtrl', function ($scope, EiskaltRPC) {
    var loadHubs = function () {
        EiskaltRPC.ListHubsFullDesc().success(function (data) {
            $scope.$root.hubs = data;
        });
    };
    loadHubs();

    $scope.newHubUrl = 'adc://';
    $scope.connect = function (newHubUrl) {
        EiskaltRPC.HubAdd(newHubUrl).success(loadHubs);
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
        EiskaltRPC.HubSay($scope.hub.huburl, $scope.newChatMessage);
        $scope.newChatMessage = '';
        $scope.refreshChat();
    }

    $scope.getFilelist = function (nick) {
        EiskaltRPC.GetFileList($scope.hub.huburl, nick);
    }
});

EiskaltApp.controller('BrowseCtrl', function ($scope, $routeParams, ShareBrowser, EiskaltRPC) {
    EiskaltRPC.ShowLocalLists().success(function (filelists) {
        $scope.filelists = filelists;
        EiskaltRPC.ShowOpenedLists().success(function (openedFilelists) {
            angular.forEach($scope.filelists, function (filelist) {
                if (openedFilelists.indexOf(filelist) < 0) {
                    EiskaltRPC.OpenFileList(filelist);
                }
            });
        });
    });
});

EiskaltApp.controller('FileListCtrl', function ($scope, EiskaltRPC) {
    $scope.filelist = $scope.$parent.filelist;

    $scope.tree = {}
    $scope.treeData = [];
    EiskaltRPC.LsDirInList('', $scope.filelist).success(function (data) {
        $scope.treeData = data;
    });

    $scope.handle = function(node) {
        if (node.isFolder) {
            EiskaltRPC.LsDirInList(node.target, $scope.filelist).success(function (children) {
                angular.forEach(children, function (child) {
                    $scope.tree.add_branch(node, child);
                });
            });
        }
    };
    $scope.download = function(node) {
        EiskaltRPC.DownloadDirFromList(node.target, '', $scope.filelist).success(function(data) {
            console.log(data);
        })
        console.log('Download', node.target, '', $scope.filelist);
    };
});

EiskaltApp.controller('QueueCtrl', function ($scope, $interval, EiskaltRPC) {
    var refreshQueue = function () {
        EiskaltRPC.ListQueue().success(function(queue) {
            $scope.queue = queue;
        });
    };
    refreshQueue();
    $interval(refreshQueue, REFRESH['queues']);
});
