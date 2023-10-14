const { parentPort, workerData } = require('worker_threads')
const fs = require('fs').promises
const utils = require('./utils')

fs.readFile('./grades.json', 'utf-8').then((data) => {
  const studentGradesData = JSON.parse(data)
  const student = workerData.student
  parentPort.postMessage({
    grades: utils.getStudentGrade(studentGradesData, student.id)
  })
})
