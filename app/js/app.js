'use strict';

var EiskaltApp = angular.module('EiskaltApp', ['ngRoute', 'ngStorage', 'ngSanitize', 'luegg.directives', 'ui.bootstrap',
                                               'angularBootstrapNavTree', 'EiskaltRPC', 'EiskaltFilters']);

EiskaltApp.value('settings', {
    version: '0.1.1',
    chatMessagesKept: 250,
    refresh: {
        hashAndRatio: 10000,
        chat: 5000,
        queues: 5000
    }
});

EiskaltApp.config(function ($routeProvider) {
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
});
