const db = require('../db')
const { Student, Course} = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
  const course = await Course.find()
  const students = [
    {
      name: 'Sarah Smith',
      email: 'sarahs34@school.edu',
      grade: 'junior',
      isadmin: false,
      profilePicture: 'https://wallpapers.com/images/hd/good-tiktok-profile-pictures-1080-x-1080-a5fxkf66f15mp227.jpg',
      course: course[0]._id
    },
    {
      name: 'Michael Johnson',
      email: 'mjohnson23@school.edu',
      grade: 'sophomore',
      isadmin: false,
      profilePicture: 'https://play-lh.googleusercontent.com/HnzbI7urJlB6V26dtKiawYoBrH4iR5DAAk4KqNZzIa0NRWQukskR6aX7IrV55AULKIgA',
      course: course[1]._id
    },
    {
      name: 'Emily Davis',
      email: 'emilydavis09@school.edu',
      grade: 'senior',
      isadmin: false,
      profilePicture: 'https://i.pinimg.com/236x/31/eb/97/31eb9767cb1e55594bfcae11c9fe1967.jpg',
      course: course[2]._id
    },
    {
      name: 'David Martinez',
      email: 'david.martinez78@school.edu',
      grade: 'freshman',
      isadmin: false,
      profilePicture: 'https://i.pinimg.com/236x/90/de/25/90de257fdac14d35d66a81ab8e282cad.jpg',
      course: course[3]._id
    }
    
    
  ]
  await Student.insertMany(students)
  console.log('Created Students!')
}

const run = async () => {
  await main()
  db.close()
}

run()