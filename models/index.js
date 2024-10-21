const mongoose = require('mongoose')
const TeacherSchema = require('./teacher')
const CourseSchema = require('./course')
const StudentSchema = require('./student')

const Teacher = mongoose.model('Teacher', TeacherSchema)
const Course = mongoose.model('Course', CourseSchema)
const Student = mongoose.model('Student', StudentSchema)

module.exports = {
   Teacher,
   Course,
   Student
}