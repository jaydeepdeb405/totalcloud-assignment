# TotalCloudAssignment
# Simple CSV Parser application
Run it as node.js application  (cd to this folder in cmd/powershell, then run 'node app.js')

Endpoints to get class wise data:
1. Parsed table - /?className='className'                       (eg. - localhost:3000?className=7th)
2. Adjusted table - /adjustTimeTable?className='className'      (eg. - localhost:3000/adjustTimeTable?className=6th)

(View runtime logs in console)


To view it in web browser (angularJs app), steps:
1. Run this as Node application      (cd to this folder in cmd/powershell, then run 'node app.js')
2. Open index.html using any web browser using windows explorer
3. Enter class name values as 6th/7th/8th/9th/10th in text field & click Get TimeTable
4. Click Adjust Timetable to view adjusted timetable & additional teacher required count
