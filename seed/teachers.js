const db = require('../db')
const { Teacher, Course} = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
  const course = await Course.find()
  const teachers = [
    {
      name: 'mary fitsburg',
      email: 'maryf@school.edu',
      password: 'MaryPass123!',
      subject: course[0]._id,
      isadmin: true,
      profilePicture: 'https://img.freepik.com/premium-vector/flat-illustration-male-teacher-logo_922041-24.jpg',
    },
    {
      name: 'john peterson',
      email: 'johnp@school.edu',
      password: 'JohnPass456!',
      subject: course[1]._id,
      isadmin: true,
      profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmB84NcT9sXmsRcZGxvObJZWB1Kig0PGh12Q&s',
    },
    {
      name: 'sophia bennett',
      email: 'sophiab@school.edu',
      password: 'SophiaPass789!',
      subject: course[2]._id,
      isadmin: true,
      profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKaLgpD-HndGl2Lca3axiuJeWZqseVrw1Khg&s',
    },
    {
      name: 'mark evans',
      email: 'marke@school.edu',
      password: 'MarkPass101!',
      subject: course[3]._id,
      isadmin: true,
      profilePicture: 'https://img.freepik.com/premium-vector/flat-illustration-male-teacher-logo_922041-24.jpg',
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