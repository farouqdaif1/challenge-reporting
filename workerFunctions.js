const { parentPort, workerData } = require('worker_threads')
const fs = require('fs').promises
const utils = require('./utils')

fs.readFile('./grades.json', 'utf-8').then((data) => {
  const studentGradesData = JSON.parse(data)
  const student = workerData.student
  switch (workerData.action) {
    case 'studentGradesReport':
      parentPort.postMessage({
        ...student,
        grades: utils.getStudentGrade(studentGradesData, student.id)
      })
      break
    case 'courseGradesReport':
      parentPort.postMessage({
        courseGradesReport: utils.courseReport(studentGradesData)

      })
      break
    default:
      break
  }
})
