const knex = require('./db')
const { Worker } = require('worker_threads')

module.exports = {
  getStudentByID,
  getStudentGrade,
  handleWorker,
  listOfCoursers,
  courseReport

}

async function getStudentByID (id) {
  const studentData = await knex('students').where('id', id).first()
  if (studentData.length === 0) {
    throw new Error('there is no students with this ID')
  } else {
    return studentData
  }
}
function getStudentGrade (data, id) {
  return data.filter(
    (student) => student.id === id
  )
}
function handleWorker (res, student, action) {
  const worker = new Worker('./workerFunctions.js', {
    workerData: { student, action }
  })
  worker.on('message', (result) => {
    res.json(result)
  })
}
function courseReport (data) {
  const courses = listOfCoursers(data)
  return courses.map((courseName) => {
    const coursesGrades = data.filter((studentGrade) => studentGrade.course === courseName)
      .map((studentGrade) => studentGrade.grade).sort((a, b) => a - b)
    const lowestGrade = coursesGrades[0]
    const highestGrade = coursesGrades[coursesGrades.length - 1]
    const averageGrade = average(coursesGrades)
    return { course: courseName, highestGrade, lowestGrade, averageGrade }
  })
}
function listOfCoursers (data) {
  return [...new Set(data.map((student) => student.course))]
}
function average (data) {
  const sumGrades = data.reduce((sum, grade) => sum + grade, 0)
  return sumGrades / data.length
}
