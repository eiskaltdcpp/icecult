/* Copyright (c) 2017 Lars Kreisz */
/* License:The MIT License (MIT) */

'use strict';

EiskaltApp.controller('MainCtrl', function ($scope, $location, $interval, settings, EiskaltRPC, UpdateCheck) {
    $scope.ui = {
        largeChat: false,
        navbarCollapsed: true
    };
    $scope.ratio = {
        bandwidth_up: 0,
        bandwidth_down: 0
    };

    EiskaltRPC.ShowVersion().success(function (data) {
        $scope.version = {
            client: settings.version,
            daemon: data
        };
        UpdateCheck.getNewerVersion($scope.version).success(function(newerVersion) {
            $scope.newerVersion = newerVersion;
        });
    });

    var refreshData = function () {
        EiskaltRPC.GetHashStatus().success(function (data) {
            $scope.hashing = data;
        });

        EiskaltRPC.ShowRatio().success(function (data) {
            function calcBandwidth(current, last) {
                return 1000 * (current - last) / settings.refresh.hashAndRatio;
            }
            $scope.ratio.bandwidth_up = calcBandwidth(parseInt(data.up_bytes), $scope.ratio.up_bytes);
            $scope.ratio.bandwidth_down = calcBandwidth(parseInt(data.down_bytes), $scope.ratio.down_bytes);
            angular.extend($scope.ratio, data);
        });

        EiskaltRPC.ListQueue().success(function(queue) {
            var queueSize = 0;
            angular.forEach(queue, function(item) {
                queueSize += parseInt(item['Size Sort']);
            });
            $scope.queue = {
                size: queueSize,
                length: queue ? queue.length : 0
            };
        });
    }
    refreshData();
    var refreshDataTimer = $interval(refreshData, settings.refresh.hashAndRatio);
    $scope.$on("$destroy", function(event) {
        $interval.cancel(refreshDataTimer);
    });

    $scope.isActive = function (route) {
        return route === $location.path();
    }

    $scope.refreshShare = function () {
        EiskaltRPC.RefreshShare().success(refreshData);
    }

    $scope.toggleHashing = function () {
        EiskaltRPC.PauseHash().success(refreshData);
    }
});
