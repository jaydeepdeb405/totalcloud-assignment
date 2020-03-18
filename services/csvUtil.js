// const getCsvObjectWithIdleTeachers = function (data) {
//     let csvDataObj = Object.assign({}, data);
//     let days = Object.keys(csvDataObj);
//     for (day of days) {
//         csvDataObj[day] = csvDataObj[day]
//             .filter(data =>
//                 data.className.length === 0
//                 && data.subjectName.length > 0);
//     }
//     return csvDataObj;
// }

const _getLeisurePeriodsByClassName = function (className, csvDataObj) {
    csvDataObj = Object.assign({}, csvDataObj);
    const periods = [
        '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
        '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
    ];
    
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

const getCsvObjectByClassName = function (className, csvDataObj) {
    csvDataObj = Object.assign({}, csvDataObj);
    const days = Object.keys(csvDataObj);
    for (day of days) {
        csvDataObj[day] = csvDataObj[day].filter(data => data.className === className);
    }
    return csvDataObj;
}

const getCsvObjectWithNoIdleTeachers = function (csvDataObj) {
    let extraTeachersRequired = 0;
    csvDataObj = _getCsvObjectWithLeisurePeriods(Object.assign({}, csvDataObj));
    const keys = Object.keys(csvDataObj);
    for(key of keys) {
        let dayData = csvDataObj[key];
        const freeClasses = dayData.filter((d) => {
            return d.subjectName.length === 0
        });
        const freeTeachers = dayData.filter((d) => {
            return d.className.length === 0
        });

        let adjustedPeriods = freeClasses;

        for(let index=0; index<freeClasses.length && freeTeachers[index]; index++) {
            adjustedPeriods[index].subjectName = freeTeachers[index].subjectName;
        }

        extraTeachersRequired += freeClasses.length - freeTeachers.length; 

        csvDataObj[key] = dayData.filter((d) => {
            return d.className.length > 0 && d.subjectName.length > 0
        });
        csvDataObj[key] = csvDataObj[key].concat(adjustedPeriods);
    }
    return { extraTeachersRequired, timeTable: csvDataObj };
}

// const sortCsvObject = function (csvDataObj) {
//     let data = {};
//     const keys = Object.keys(csvDataObj);
//     for(key of keys) {
//         let dayData = csvDataObj[key];
//         dayData = dayData.sort((a, b) => {
//             return a.time>b.time ? 1 : -1;
//         });
//         data[key] = dayData;
//     }
//     return data;
// }

const getCsvObject = function (subjectName, data, csvDataObj) {
    const rows = data.split('\r\n');

    const days = rows[0].split(',').slice(1, this.length);

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
        // arr = arr.sort((a, b) => {
        //     return a.time>b.time ? 1 : -1;
        // })
        csvDataObj[days[dayIndex]] = arr;
    }
    return csvDataObj;
}

const _getCsvObjectWithLeisurePeriods = function(data) {
    data = Object.assign({}, data);
    const classNames = ['6th', '7th', '8th', '9th', '10th'];
    for (className of classNames) {
        let leisurePeriods = _getLeisurePeriodsByClassName(className, data);
        for (leisurePeriod of leisurePeriods) {
            for (period of leisurePeriod.periods) {
                let classWiseData = {
                    time: period,
                    className: className,
                    subjectName: ""
                };
                data[leisurePeriod.day].push(classWiseData);
            }
        }
    }
    return data;
};

module.exports = { 
    getCsvObject, 
    getCsvObjectByClassName, 
    getCsvObjectWithNoIdleTeachers
 };