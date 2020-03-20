var app = angular.module('TimetableApp', []);
app.controller('tableController', function ($scope, $http) {

    $scope.classWiseTable = false;
    $scope.extraTeachersRequired = "";
    $scope.heading = "";

    $scope.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    $scope.getTimeTableByClassName = function (className, adjust) {
        if (className) {
            document.getElementById('className').style.border = "";
            adjust === true ? url = `http://localhost:3000/adjustTimeTable?class=${className}`
                : url = `http://localhost:3000?class=${className}`;
            $http.get(url)
                .then(function (response) {
                    $scope.classWiseData = response.data.timeTable;
                    $scope.extraTeachersRequired = response.data.extraTeachersRequired;
                    $scope.heading = `Timetable for class ${className} with co-teachers`;
                    if (!adjust) {
                        $scope.heading = `Timetable for class ${className}`;
                        $scope.extraTeachersRequired = "";
                        $scope.classWiseData = response.data;
                    }
                    $scope.classWiseTable = true;
                });
        }
        else {
            document.getElementById('className').style.border = "solid red 3px"
        }
    }

});