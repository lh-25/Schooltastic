const db = require('../db')
const { Course } = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
  const courses = [
    {name:'Math',
       schedule: ['mon','thurs'],
       durationInMinutes: 60,
       courseCode: 45731, 
       seatsAvalible: 34,},

       {name:'Science',
        schedule: ['tues','fri'],
        durationInMinutes: 45,
        courseCode: 93840, 
        seatsAvalible: 9,},

        {name:'English',
          schedule: ['wed'],
          durationInMinutes: 90,
          courseCode: 20849, 
          seatsAvalible: 2,},

          {name:'History',
            schedule: ['wed','fri'],
            durationInMinutes: 30,
            courseCode: 92378, 
            seatsAvalible: 20,},
  ]
  await Course.insertMany(courses)
  console.log('Created Courses!')
}

const run = async () => {
  await main()
  db.close()
}

run()