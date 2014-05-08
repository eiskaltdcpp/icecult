angular.module('EiskaltFilters', []).filter('numeraljs', function () {
    return function (input, format) {
        return numeral(input).format(format);
    };
});