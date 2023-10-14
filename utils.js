const knex = require('./db')
const { Worker } = require('worker_threads')

module.exports = {
  getStudentByID,
  getStudentGrade,
  handleWorker
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
function handleWorker (res, student) {
  const worker = new Worker('./workerFunctions.js', {
    workerData: { student }

  })
  worker.on('message', (result) => {
    student.grades = result.grades
    res.json(student)
  })
}
