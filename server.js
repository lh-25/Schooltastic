const express = require('express');
const cors = require('cors')
const db = require('./db');
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
