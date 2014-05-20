'use strict';

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