/* Copyright (c) 2017 Lars Kreisz */
/* License:The MIT License (MIT) */

angular.module('EiskaltDirectives', [])
    .directive('maxHeight', function ($window, $timeout) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                scope.onResize = function () {
                    var offset = parseInt(attrs.maxHeightOffset || 0);
                    angular.forEach(attrs.maxHeight.split(' '), function (className) {
                        angular.forEach(document.getElementsByClassName(className), function (box) {
                            offset += box.offsetHeight;
                        });
                    });
                    elem[0].style.height = ($window.innerHeight - offset) + 'px';
                }

                $timeout(scope.onResize, 250);

                angular.element($window).bind('resize', function () {
                    scope.onResize();
                })
            }
        };
    })
;