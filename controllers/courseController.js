const { Course } = require('../models')

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find()
        res.json(courses)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getCourseById = async (req, res) => {
    try {
        const { id } = req.params
        const course = await Course.findById(id)
        if (course) {
            return res.json(course)
        }
        return res.status(404).send('Course with the specified ID does not exists')

    } catch (error) {
        return res.status(500).send(error.message)
    }
}



const createCourse = async (req, res) => {
    try {
        const course = await new Course(req.body)
        await course.save()
        return res.status(201).json({ course })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


const updateCourse = async (req, res) => {
    try {
        let { id } = req.params
        let course = await Course.findByIdAndUpdate(id, req.body, { new: true })
        if (course) {
            return res.status(200).json(course)
        }
        throw new Error("Course not found")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await Course.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Course deleted")
        }
        throw new Error("Course not found")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getCourseByName = async (req, res) => {
    try {
        const { name } = req.params
        const decodedName = decodeURIComponent(name)
        const course = await Course.find({ name })
        if (course.length > 0) {
            return res.json(course)
        }
        return res.status(404).send('Course with the specified name does not exist')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getCourseByCode = async (req, res) => {
    try {
        const { code } = req.params
        const course = await Course.findOne({ courseCode: code })
        if (course) {
            return res.json(course)
        }
        return res.status(404).send('Course with the specified code does not exist')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


module.exports = {
    getAllCourses,
    getCourseById,
    getCourseByCode,
    getCourseByName,
    createCourse,
    updateCourse,
    deleteCourse

}