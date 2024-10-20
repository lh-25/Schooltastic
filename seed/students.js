const db = require('../db')
const { Student} = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
  const students = [
    
  ]
  await Student.insertMany(students)
  console.log('Created Students!')
}

const run = async () => {
  await main()
  db.close()
}

run()