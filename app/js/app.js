'use strict';

var REFRESH = {
    'hash_ratio': 12000,
    'hub_chat': 7500,
    'queues': 10000
}

var EiskaltApp = angular.module('EiskaltApp', ['ngRoute', 'ngStorage', 'ngSanitize', 'luegg.directives', 'ui.bootstrap',
                                               'angularBootstrapNavTree', 'EiskaltRPC', 'EiskaltFilters']);

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
