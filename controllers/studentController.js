const { Student } = require('../models')

const getAllStudents = async (req,res) => {
    try{
        const students = await Student.find().populate('course')
        res.json(students)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getStudentById = async (req,res) => {
    try{
        const {id} = req.params
        const student = await Student.findById(id).populate('course')
        if(student) {
            return res.json(student)
        }
        return res.status(404).send('Student with the specified ID does not exists')

    } catch (error){
        return res.status(500).send(error.message)
    }
}


const createStudent = async (req,res) => {
    try {
        const student = await new Student(req.body)
        await student.save()
        return res.status(201).json({student})
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateStudent = async (req, res) => {
    try {
        let { id } = req.params;
        let student = await Student.findByIdAndUpdate(id, req.body, { new: true })
        if (student) {
            return res.status(200).json(student)
        }
        throw new Error("Student not found")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Student.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Student deleted");
        }
        throw new Error("Student not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getStudentByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const student = await Student.findOne({ email });
        if (student) {
            return res.json(student);
        }
        return res.status(404).send('Student with the specified email does not exist');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
const getStudentByName = async (req, res) => {
    try {
        const  name  = req.params;
        console.log()
        const student = await Student.find({ name });
        console.log(student)
        if (student.length > 0) {
            return res.json(student);
        }
        return res.status(404).send('Student with the specified name does not exist');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};




module.exports = {
    getAllStudents,
    getStudentById,
    getStudentByName,
    getStudentByEmail,
    createStudent,
    updateStudent,
    deleteStudent

}