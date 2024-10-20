const db = require('../db')
const { Course, Teacher, Student} = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
  const teachers = await Teacher.find()
  const students = await Student.find()
  const courses = [
    
  ]
  await Course.insertMany(courses)
  console.log('Created Courses!')
}

const run = async () => {
  await main()
  db.close()
}

run()