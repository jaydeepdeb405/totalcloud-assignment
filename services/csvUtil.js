const getCsvObjectWithIdleTeachers = function (data) {
    let csvDataObj = Object.assign({}, data);
    let days = Object.keys(csvDataObj);
    for (day of days) {
        csvDataObj[day] = csvDataObj[day]
            .filter(data =>
                data.className.length === 0
                && data.subjectName.length > 0);
    }
    return csvDataObj;
}

const getLeisurePeriodsByClassName = function (className, data) {
    let csvDataObj = Object.assign({}, data);
    const periods = [
        '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
        '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
    ];
    const classNames = ['6th', '7th', '8th', '9th', '10th'];
    
    csvDataObj = getCsvObjectByClassName(className, csvDataObj);
    let leisurePeriods = [];
    let days = Object.keys(csvDataObj);
    for (day of days) {
        let occupiedPeriods = [];
        csvDataObj[day].forEach((data) => {
            occupiedPeriods.push(data.time);
        });
        leisurePeriods.push({day: day, 
            periods: periods.filter((data) => occupiedPeriods.indexOf(data) === -1)});
    }
    return leisurePeriods;
}

const getCsvObjectByClassName = function (className, data) {
    let csvDataObj = Object.assign({}, data);
    let days = Object.keys(csvDataObj);
    for (day of days) {
        csvDataObj[day] = csvDataObj[day].filter(data => data.className === className);
    }
    return csvDataObj;
}

const getCsvObjectNoIdle = function (data) {
    let csvDataObj = Object.assign({}, data);
    let days = Object.keys(csvDataObj);
    for (day of days) {
        csvDataObj[day] = csvDataObj[day].filter(data => data.className === className);
    }
    return csvDataObj;
}

const getCsvObject = function (subjectName, data, csvDataObj) {
    // let csvDataObj = {};
    let rows = data.split('\r\n');

    let days = rows[0].split(',').slice(1, this.length);

    for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
        let arr = csvDataObj[days[dayIndex]] || [];
        for (let index = 1; index < rows.length; index++) {
            let dayData = {
                time: '',
                className: '',
                subjectName: ''
            };
            let row = rows[index].split(',');
            dayData.time = row[0];
            dayData.className = row[dayIndex + 1];
            dayData.subjectName = subjectName;
            arr.push(dayData);
        }
        arr = arr.sort((a, b) => {
            return a.time>b.time ? 1 : -1;
        })
        csvDataObj[days[dayIndex]] = arr;
    }
    return csvDataObj;
}

module.exports = { 
    getCsvObject, 
    getCsvObjectByClassName, 
    getCsvObjectWithIdleTeachers, 
    getLeisurePeriodsByClassName };