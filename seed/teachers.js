const db = require('../db')
const { Teacher, Course} = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
  const course = await Course.find()
  const teachers = [
    {
      name: 'Mary Fitsburg',
      email: 'maryf@school.edu',
      subject: course[0]._id,
      isadmin: true,
      profilePicture: 'https://img.freepik.com/premium-vector/flat-illustration-male-teacher-logo_922041-24.jpg',
    },
    {
      name: 'John Peterson',
      email: 'johnp@school.edu',
      subject: course[1]._id,
      isadmin: true,
      profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmB84NcT9sXmsRcZGxvObJZWB1Kig0PGh12Q&s'
    },
    {
      name: 'Sophia Bennett',
      email: 'sophiab@school.edu',
      subject: course[2]._id,
      isadmin: true,
      profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKaLgpD-HndGl2Lca3axiuJeWZqseVrw1Khg&s'
    },
    {
      name: 'Mark Evans',
      email: 'marke@school.edu',
      subject: course[3]._id,
      isadmin: true,
      profilePicture: 'https://img.freepik.com/premium-vector/flat-illustration-male-teacher-logo_922041-24.jpg'
    }
    
  ]
  await Teacher.insertMany(teachers)
  console.log('Created Teachers!')
}

const run = async () => {
  await main()
  db.close()
}

run()