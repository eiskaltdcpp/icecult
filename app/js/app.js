/* Copyright (c) 2017 Lars Kreisz */
/* License:The MIT License (MIT) */

'use strict';

var EiskaltApp = angular.module('EiskaltApp', ['ngRoute', 'ngStorage', 'ngSanitize', 'luegg.directives', 'ui.bootstrap',
                                               'angularBootstrapNavTree', 'UpdateCheck', 'EiskaltRPC', 'EiskaltFilters',
                                               'EiskaltDirectives', 'DesktopNotification']);

EiskaltApp.value('settings', {
    version: '0.6.2',
    localStorageVersion: 2,
    updateUrl: 'https://api.github.com/repos/kraiz/icecult/releases',
    chatMessagesKept: 250,
    notificationTimeout: 5000,
    refresh: {
        hashAndRatio: 5000,
        chat: 3000,
        queues: 5000
    },
    settings: [
        {key: 'Nick', type: 'text'},
        {key: 'Description', type: 'text'},
        {key: 'ExternalIp', type: 'text'},
        {key: 'MaxUploadSpeedMain', type: 'number', suffix: 'kB/s'},
        {key: 'MaxDownloadSpeedMain', type: 'number', suffix: 'kB/s'},
        {key: 'DownloadDirectory', type: 'text'},
        {key: 'TempDownloadDirectory', type: 'text'},
    ]
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
        .when('/settings', {
            controller: 'SettingsCtrl',
            templateUrl: 'partials/settings.html'
        })
        .otherwise({redirectTo: '/hubs'});
});

EiskaltApp.run(function($localStorage, settings) {
    // every time the localStorageVersion changes clear the localStorage as data structure has changed
    var localStorage = $localStorage.$default({version: settings.localStorageVersion});
    if (localStorage.version < settings.localStorageVersion) {
        $localStorage.$reset();
        $localStorage.$default({version: settings.localStorageVersion});
    }
});
