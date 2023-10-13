const knex = require('./db')

module.exports = {
    getStudentByID
}
async function getStudentByID(id) {
    try {
        const studentData = await knex("students").where("id", id)
        if (studentData.length === 0) {
            throw new Error("there is no students with this ID");
        }
        else {
            return studentData;
        }
    } catch (error) {
        throw error
    }
}
