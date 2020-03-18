var app = angular.module('TimetableApp', []);
app.controller('tableController', function ($scope, $http) {

    $scope.classWiseTable = false;
    $scope.adjustedTable = false;
    $scope.extraTeachersRequired = "";

    $scope.getTimeTableByClassName = function (className) {
        $scope.getDataByClassName(className);
    }

    $scope.adjustTimeTable = function () {
        $http.get('http://localhost:3000/adjustTimeTable')
            .then(function (response) {
                $scope.classWiseTable = false;
                $scope.adjustedTableData = response.data.timeTable;
                $scope.extraTeachersRequired = response.data.extraTeachersRequired;

                $scope.adjustedTable = true;
            });
    }

    $scope.getDataByClassName = function (className) {
        $http.get(`http://localhost:3000?class=${className}`)
            .then(function (response) {
                $scope.extraTeachersRequired = "";
                $scope.adjustedTable = false;
                console.log(response.data);
                $scope.classWiseData = response.data;
                let periods = [
                    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
                    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
                ];
                const days = Object.keys(response.data);
                let dataToDisplay = [];
                for (day of days) {
                    let dayData = response.data[day];
                    console.log(dayData);
                }
                if (response.data[days[0]].length > 0) {
                    $scope.classWiseTable = true;
                }
            });
    }

});

function hello() {
    return 'hello'
}