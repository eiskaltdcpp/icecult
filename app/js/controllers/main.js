'use strict';

EiskaltApp.controller('MainCtrl', function ($scope, $location, $interval, settings, EiskaltRPC) {
    EiskaltRPC.ShowVersion().success(function (data) {
        $scope.version = data;
    });

    var refreshData = function () {
        EiskaltRPC.GetHashStatus().success(function (data) {
            $scope.hashing = data;
        });
        EiskaltRPC.ShowRatio().success(function (data) {
            $scope.ratio = data;
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
});