var app = angular.module('TimetableApp', []);
app.controller('tableController', function ($scope, $http) {

    $scope.classWiseTable = false;
    $scope.extraTeachersRequired = "";
    $scope.heading = "";

    $scope.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    $scope.getTimeTableByClassName = function (className, adjust) {
        adjust === true ? url = `http://localhost:3000/adjustTimeTable?class=${className}`
            : url = `http://localhost:3000?class=${className}`;
        $http.get(url)
            .then(function (response) {
                $scope.classWiseData = response.data.timeTable;
                $scope.extraTeachersRequired = response.data.extraTeachersRequired;
                $scope.heading = `Adjusted timetable for class ${className}`;
                if (!adjust) {
                    $scope.heading = `Timetable for class ${className}`;
                    $scope.extraTeachersRequired = "";
                    $scope.classWiseData = response.data;
                }
                $scope.classWiseTable = true;
            });
    }

});