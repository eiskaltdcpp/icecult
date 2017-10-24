/* Copyright (c) 2017 Lars Kreisz */
/* License:The MIT License (MIT) */

"use strict";

EiskaltApp.controller('ShareCtrl', function ($scope, $modal, settings, EiskaltRPC) {
    $scope.directories = []

    $scope.refresh = function () {
        EiskaltRPC.ListShare().success(function (directories) {
            $scope.directories = directories;
        });
    };
    $scope.refresh();

    $scope.openAddShareDirModal = function () {
        $modal.open({
            templateUrl: 'addShareDirModal.html',
            controller: 'AddShareDirCtrl'
        }).result.then($scope.refresh);
    };

    $scope.removeShareDir = function (directory) {
        if (confirm(
                'Are you sure to unshare the directory ' + directory.name + '?\n' +
                'Rehashing ' + directory.sizeFormatted + ' may take a while.'
            )) {
            EiskaltRPC.DelDirFromShare(directory.name).success($scope.refresh);
        }
    }
});

EiskaltApp.controller('AddShareDirCtrl', function ($scope, $modalInstance, EiskaltRPC) {
    $scope.name = "";
    $scope.path = "";

    $scope.ok = function () {
        EiskaltRPC.AddDirInShare($scope.path, $scope.name).success(function (result) {
            $modalInstance.close(result === 0);
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});