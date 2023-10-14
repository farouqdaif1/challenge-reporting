const knex = require('./db')
const utils = require('./utils')

module.exports = {
  getHealth,
  getStudent,
  getStudentGradesReport,
  getCourseGradesReport
}

async function getHealth (req, res, next) {
  try {
    await knex('students').first()
    res.json({ success: true })
  } catch (e) {
    console.log(e)
    res.status(500).end()
  }
}

async function getStudent (req, res, next) {
  const { id } = req.params
  try {
    const student = await utils.getStudentByID(Number(id))
    res.json({ student })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

async function getStudentGradesReport (req, res, next) {
  const { id } = req.params
  try {
    const student = await utils.getStudentByID(Number(id))
    utils.handleWorker(res, student, 'studentGradesReport')
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

async function getCourseGradesReport (req, res, next) {
  try {
    utils.handleWorker(res, null, 'courseGradesReport')
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}
