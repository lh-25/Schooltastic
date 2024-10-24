const express = require('express')
const cors = require('cors')
const db = require('./db')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const logger = require('morgan')
const { Course, Teacher, Student } = require('./models')
const courseController = require('./controllers/courseController')
const teacherController = require('./controllers/teacherController')
const studentController = require('./controllers/studentController')

const PORT = process.env.PORT || 3001
const app = express()

// Middleware setup
app.use(express.json())
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

// Signup Route
const handleSignup = async (req, res) => {
    try {
        const { name, email, password, profession, grade } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)

        let user
        if (profession === 'student') {
            user = new Student({
                name, email, password: hashedPassword, grade, isadmin: false,
            })
        } else if (profession === 'teacher') {
            user = new Teacher({
                name, email, password: hashedPassword, isadmin: true,
            })
        }

        await user.save()
        res.status(201).json({ message: 'Signup successful', user })
    } catch (error) {
        console.error('Error during signup:', error)
        res.status(500).json({ message: 'Signup failed', error: error.message })
    }
}

// Login Route
const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await Student.findOne({ email }) || await Teacher.findOne({ email })

        if (!user) return res.status(404).json({ message: 'User not found' })

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' })

        res.status(200).json({ message: 'Login successful', user })
    } catch (error) {
        console.error('Login failed:', error)
        res.status(500).json({ message: 'Login failed', error: error.message })
    }
}

// Register Routes
app.post('/signup', handleSignup)
app.post('/login', handleLogin)

// Course Routes
app.get('/courses', courseController.getAllCourses)
app.get('/courses/:id', courseController.getCourseById)
app.get('/courses/code/:code', courseController.getCourseByCode)
app.get('/courses/name/:name', courseController.getCourseByName)
app.post('/courses/create', courseController.createCourse)
app.put('/courses/update/:id', courseController.updateCourse)
app.delete('/courses/delete/:id', courseController.deleteCourse)

// Student Routes
app.get('/students', studentController.getAllStudents)
app.get('/students/:id', studentController.getStudentById)
app.get('/students/email/:email', studentController.getStudentByEmail)
app.get('/students/course/:courseId', studentController.getStudentByCourseId)
app.get('/students/name/:name', studentController.getStudentByName)
app.post('/students/create', studentController.createStudent)
app.put('/students/update/:id', studentController.updateStudent)
app.delete('/students/delete/:id', studentController.deleteStudent)

// Teacher Routes
app.get('/teachers', teacherController.getAllTeachers)
app.get('/teachers/:id', teacherController.getTeacherById)
app.get('/teachers/email/:email', teacherController.getTeacherByEmail)
app.get('/teachers/name/:name', teacherController.getTeacherByName)
app.post('/teachers/create', teacherController.createTeacher)
app.put('/teachers/update/:id', teacherController.updateTeacher)
app.delete('/teachers/delete/:id', teacherController.deleteTeacher)
