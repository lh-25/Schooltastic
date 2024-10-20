const db = require('../db')
const { Teacher} = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
  const teachers = [
    
  ]
  await Teacher.insertMany(teachers)
  console.log('Created Teachers!')
}

const run = async () => {
  await main()
  db.close()
}

run()