'use strict';

/* RPC-Service-Facade for browsing user's share */

angular.module('ShareBrowser', ['EiskaltRPC']).factory('ShareBrowser', function($q, EiskaltRPC) {
    return {
        BuildBrowseCtrlContext: function(cid) {
            var deferred = $q.defer();
            EiskaltRPC.ListHubsFullDesc().success(function(hubs) {
                angular.forEach(hubs, function(hub) {
                    EiskaltRPC.GetHubUserList(hub.huburl).success(function(users) {
                        angular.forEach(users, function(user) {
                            EiskaltRPC.GetUserInfo(user, hub.huburl).success(function(userInfo) {
                                if (userInfo.CID === cid) {
                                    EiskaltRPC.GetFileList(hub.huburl, userInfo.Nick).success(function(fileList) {
                                        deferred.resolve({
                                            hub: hub,
                                            user: userInfo
                                        });
                                    });
                                }
                            });
                        })
                    })
                });
            });
            return deferred.promise;
        }
    }
});