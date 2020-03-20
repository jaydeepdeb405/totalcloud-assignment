# Simple CSV Parser Node.JS application

To view it in web browser (angularJs app), steps:
1. Run this as Node application      (cd to this folder in cmd/powershell, then run 'npm start'/'node index.js')
2. Open localhost:4200
3. Select class name & click View Timetable
4. Click Assign co-teachers to view timetable with co-teachers added & minimum number of extra co-teachers required

Endpoints to get class wise data:
1. Parsed table - localhost:3000/?className='className'                       (eg. - localhost:3000?className=7th)
2. Adjusted table - localhost:3000/adjustTimeTable?className='className'      (eg. - localhost:3000/adjustTimeTable?className=6th)
(Runtime logs will be visible in console)
