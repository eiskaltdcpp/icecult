/* Copyright (c) 2017 Lars Kreisz */
/* License:The MIT License (MIT) */

'use strict';
EiskaltApp.controller('SearchCtrl', function ($scope, $interval, settings, EiskaltRPC) {
    $scope.result = [];
    $scope.term = "";
    $scope.hubs = [];
    $scope.filelists = [];

    var loadHubs = function () {
        EiskaltRPC.ListHubsFullDesc().success(function (data) {
            $scope.hubs = data;
        });
    };
    loadHubs();

    $scope.loadLists = function () {
        EiskaltRPC.ShowLocalLists().success(function (filelists) {
            $scope.filelists = filelists;
        });
    };
    $scope.loadLists();

    $scope.refreshSearchResults = function () {
        if($scope.hub != null) {
            EiskaltRPC.ReturnSearchResults($scope.hub.huburl).success(function (result) {
                $scope.result = result;
            });
        }
    };

    $scope.refreshSearchPage = function () {
        $scope.loadLists();
        $scope.refreshSearchResults();
    };

    var refreshSearchTimer = $interval($scope.refreshSearchPage, settings.refresh.search);
    $scope.$on("$destroy", function(event) {
        $interval.cancel(refreshSearchPage);
    });

    $scope.search = function() {
        $scope.result = [];
        EiskaltRPC.ClearSearchResults($scope.hub.huburl).success(function (status) {
           if (status != 0) {
                alert("Couldn't clear old results");
            }
        });
        EiskaltRPC.SendSearch($scope.term, 0, 0, 0, 0.0, $scope.hub.huburl)
            .success(function(status) {
            if (status != 0) {
                alert('Search failed.');
            }
        });
    };
});

EiskaltApp.controller('SearchDownloadCtrl', function ($scope, EiskaltRPC) {
    $scope.nonDownloadableFile = true;
    $scope.downloadedFileList = false;

    $scope.$watch(
        function () {
            var item = $scope.$parent.item;
            var filelist = item.Nick + "." + item.CID + ".xml.bz2";
            return $scope.filelists.includes(filelist);
        },
        function (newValue, oldValue, scope) {
            if(oldValue != newValue) {
                $scope.downloadedFileList = newValue;
                $scope.nonDownloadableFile = !newValue;
            }
        }
    );

    $scope.init = function(item) {
        var filelist = item.Nick + "." + item.CID + ".xml.bz2";
        $scope.downloadedFileList = $scope.filelists.includes(filelist);
        $scope.nonDownloadableFile = !$scope.downloadedFileList;
    };

    $scope.downloadFileList = function(item) {
        var filelist = item.Nick + "." + item.CID + ".xml.bz2";
        if(!$scope.filelists.includes(filelist)) {
            EiskaltRPC.GetFileList($scope.hub.huburl, item.Nick).success(function(filelist) {
                if(status != 0) {
                    alert('Download failed. Maybe still downloading or downloaded already?');
                }
            });
        } else {
            alert('Filelist already downloaded.');
        }
    };

    $scope.download = function(item) {
        var isFolder = item.Filename.endsWith('/');
        var method = isFolder ? EiskaltRPC.DownloadDirFromList : EiskaltRPC.DownloadFileFromList;
        var target = (item.Path + item.Filename).replace(/\//g,"\\");
        var filelist = item.Nick + "." + item.CID + ".xml.bz2";
        if($scope.filelists.includes(filelist)) {
            method(target, '', filelist).success(function (status) {
                if (status == 0) {
                    $scope.nonDownloadableFile = true;
                } else {
                    alert('Download failed. Maybe still downloading or downloaded already?');
                }
            });
        } else {
            alert('Download failed. Please download the filelist first');
        }
    };
});
