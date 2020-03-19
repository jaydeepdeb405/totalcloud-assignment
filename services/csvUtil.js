// metadata
let meta = {}
/*
    Takes a subject wise data csv stringified & subjectNames array
    */
function getTimeTableByClassName(teacherWiseCsvData, subjectNames, classData) {
    let classWiseData = {}
    for (cls of meta.classNames) {
        let classData = {};
        for (subjectName of subjectNames) {
            const teacherWiseData = teacherWiseCsvData[subjectName];
            const rows = teacherWiseData.indexOf('\r\n') === -1 ?
                teacherWiseData.split('\n') : teacherWiseData.split('\r\n');
            if (Object.keys(classData).length === 0) {
                for (period of meta.periods) {
                    classData[period] = new Array(meta.days.length);
                }
            }
        
            for (let index = 1; index < rows.length; index++) {
                const rowData = rows[index].split(',');
                for (let element = 1; element < rowData.length; element++) {
                    const thisClass = rowData[element];
                    if (thisClass && cls === thisClass) {
                        classData[meta.periods[index - 1]][element - 1] = subjectName;
                    }
                }
            }
        }
        classWiseData[cls] = classData;
    }
    return classWiseData;
}

/*
    Takes a subject wise data csv stringified & subjectNames array
    */
function setMetadata(data, subjectNames) {
    const rows = data.indexOf('\r\n') === -1 ? data.split('\n') : data.split('\r\n');
    let days = rows[0].split(',');
    let periods = [];
    let classNames = [];

    for (let index = 1; index < rows.length; index++) {
        const rowData = rows[index].split(',');
        const period = rowData[0];
        for (let element = 1; element < rowData.length; element++) {
            let className = rowData[element];
            if (className && classNames.indexOf(className) === -1) {
                classNames.push(className);
            }
        }
        periods.push(period);
    }
    days.shift();
    meta = { days, periods, classNames, subjectNames };
}

/*
    Takes a subject wise data csv stringified & returns their object
    */
   function _getIdleTeachers(teacherWiseCsvData, subjectNames) {
    let idleTeacherData = {};
    for (subjectName of subjectNames) {
        const teacherWiseData = teacherWiseCsvData[subjectName];
        // idleTeacherData[subjectName] = getIdleTeachers(teacherWiseData);
        for (subjectName of subjectNames) {
            let idleData = {}
            const teacherWiseData = teacherWiseCsvData[subjectName];
            const rows = teacherWiseData.indexOf('\r\n') === -1 ?
                teacherWiseData.split('\n') : teacherWiseData.split('\r\n');
        
            for (period of meta.periods) {
                idleData[period] = new Array(meta.days.length);
            }
        
            for (let index = 1; index < rows.length; index++) {
                const rowData = rows[index].split(',');
                for (let element = 1; element < rowData.length; element++) {
                    const thisClass = rowData[element];
                    if (!thisClass) {
                        idleData[meta.periods[index - 1]][element - 1] = 'free';
                    }
                }
            }
            idleTeacherData[subjectName] = idleData;
        }
    }
    return idleTeacherData;
}

function getTimeTableWithNoIdleTeachers(classWiseData, teacherWiseCsvData, subjectNames) {
    const idleTeacherData = _getIdleTeachers(teacherWiseCsvData, subjectNames);
    let newTimeTable = Object.assign({}, classWiseData);
    let totalFreeSlots = 0;
    const classNames = Object.keys(classWiseData);

    for (subject of subjectNames) {
        for (period of meta.periods) {
            let periodData = idleTeacherData[subject][period];
            for (index in periodData) {
                // found the free spaces
                if (periodData[index] === "free") {
                    totalFreeSlots++;
                    for (cls of classNames) {
                        if (newTimeTable[cls][period][index] &&
                            newTimeTable[cls][period][index].indexOf(' co ') === -1) {
                            newTimeTable[cls][period][index] += " co " + subject;
                            break;
                        }
                    }
                }
            }
        }
    }
    const averageFreeSlots = totalFreeSlots/subjectNames.length;
    const neededCoTeacherSlots = _getNeededCoTeacherSlots(newTimeTable);
    console.log(averageFreeSlots, neededCoTeacherSlots)
    const minRequiredExtraCoTeachers = Math.ceil(neededCoTeacherSlots/averageFreeSlots);

    return { timeTable: newTimeTable, minRequiredExtraCoTeachers};
}

function _getNeededCoTeacherSlots(newTimeTable) {
    let neededCoTeacherSlots = 0;
    for(cls of meta.classNames) {
        for(period of meta.periods) {
            let periodData = newTimeTable[cls][period];
            for (index in periodData) {
                if(newTimeTable[cls][period][index]
                    && newTimeTable[cls][period][index].indexOf(' co ') === -1)
                    neededCoTeacherSlots++;
            }
        }
    }
    return neededCoTeacherSlots;
}

module.exports = {
    getTimeTableByClassName,
    getTimeTableWithNoIdleTeachers,
    setMetadata
};
