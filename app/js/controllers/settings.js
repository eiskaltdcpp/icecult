/* Copyright (c) 2017 Lars Kreisz */
/* License:The MIT License (MIT) */

'use strict';

EiskaltApp.controller('SettingsCtrl', function ($scope, $timeout, $modal, settings, EiskaltRPC) {
    $scope.settings = settings.settings

    $scope.reset = function() {
        angular.forEach($scope.settings, function (setting) {
            EiskaltRPC.SettingsGetSet(setting.key).success(function(value) {
                if (setting.type === 'number') {
                    value = parseInt(value);
                }
                setting.value = value;
            });
        });
        EiskaltRPC.ListShare().success(function(shares) {
            $scope.shares = shares;
        });
    };
    $scope.reset();

    $scope.save = function() {
        angular.forEach($scope.settings, function (setting) {
            EiskaltRPC.SettingsGetSet(setting.key, setting.value).success(function(success) {
                if (success) {
                    setting.success = true;
                    $timeout(function() {
                        delete setting.success;
                    }, 2000)
                } else {
                    setting.error = true;
                }
            });
        });
    };
});