const express = require('express');
const cors = require('cors')
const db = require('./db');
const {Course, Teacher, Student } = require('./models')
const courseController = require('./controllers/courseController')
const teacherController = require('./controllers/teacherController')
const studentController = require('./controllers/studentController')
const bodyParser = require('body-parser')
const logger = require('morgan')

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))


app.get('/', (req,res) => res.send('Welcome to Schooltastic a course management portal!'))

// Course Routes
app.get('/courses', courseController.getAllCourses);
app.get('/courses/:id', courseController.getCourseById);
app.get('/courses/code/:code', courseController.getCourseByCode);
app.get('/courses/name/:name', courseController.getCourseByName);
app.post('/courses/create', courseController.createCourse);
app.put('/courses/update/:id', courseController.updateCourse);
app.delete('/courses/delete/:id', courseController.deleteCourse);

// Student Routes
app.get('/students', studentController.getAllStudents);
app.get('/students/:id', studentController.getStudentById);
app.get('/students/email/:email', studentController.getStudentByEmail);
app.get('/students/name/:name', studentController.getStudentByName);
app.post('/students/create', studentController.createStudent);
app.put('/students/update/:id', studentController.updateStudent);
app.delete('/students/delete/:id', studentController.deleteStudent);

// Teacher Routes
app.get('/teachers', teacherController.getAllTeachers);
app.get('/teachers/:id', teacherController.getTeacherById);
app.get('/teachers/email/:email', teacherController.getTeacherByEmail);
app.get('/teachers/name/:name', teacherController.getTeacherByName);
app.post('/teachers/create', teacherController.createTeacher);
app.put('/teachers/update/:id', teacherController.updateTeacher);
app.delete('/teachers/delete/:id', teacherController.deleteTeacher);
