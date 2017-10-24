/* Copyright (c) 2017 Lars Kreisz */
/* License:The MIT License (MIT) */

'use strict';

angular.module('DesktopNotification', []).factory('DesktopNotification', function ($window, settings) {

    var notify = function (title, text) {
        // no support
        if (!("Notification" in window)) return;
        // request permission if not granted nor denied
        if (Notification.permission !== "granted" && Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                notify(title, text);
            });
            return;
        }
        // if granted, notify!
        if (Notification.permission === "granted") {
            var notification = new Notification(title, {body: text});
            notification.onclick = function() {
                $window.focus();
            };
            notification.onshow = function() {
                $window.setTimeout(function() {
                    notification.close()
                }, settings.notificationTimeout);
            };
        }
    };

    var notifyChat = function(hub, messages) {
        if (document.hidden) {
            notify(
                hub.hubname,
                messages.map(function(msg) {
                    return msg.nick + ': ' + msg.text
                }).join('\n')
            );
        }
    };

    return {
        notifyChat: notifyChat
    }
});
