const { Teacher } = require('../models')

const getAllTeachers = async (req,res) => {
    try{
        const teachers = await Teacher.find().populate('subject')
        res.json(teachers)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getTeacherById = async (req,res) => {
    try{
        const {id} = req.params
        const teacher = await Teacher.findById(id).populate('subject')
        if(teacher) {
            return res.json(teacher)
        }
        return res.status(404).send('Teacher with the specified ID does not exists')

    } catch (error){
        return res.status(500).send(error.message)
    }
}


const createTeacher = async (req,res) => {
    try {
        const teacher = await new Teacher(req.body)
        await teacher.save()
        return res.status(201).json({teacher})
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateTeacher = async (req, res) => {
    try {
        let { id } = req.params;
        let teacher = await Teacher.findByIdAndUpdate(id, req.body, { new: true })
        if (teacher) {
            return res.status(200).json(teacher)
        }
        throw new Error("Teacher not found")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


const deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Teacher.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Teacher deleted");
        }
        throw new Error("Teacher not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getTeacherByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const teacher = await Teacher.findOne({ email }).populate('subject');
        if (teacher) {
            return res.json(teacher);
        }
        return res.status(404).send('Teacher with the specified email does not exist');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const getTeacherByName = async (req, res) => {
    // everytime i would search for the name %20 would make the search invalid because the name wouldn'nt exist in the data base. i asked chatgpt "how do i make the params ignore the %20 when I search by name" and it gave me decodeURLComponent as a solution because it will basically change the %20 back into spaces before looking through the database to get the information to return. i also found this article about it https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent. 
    try {
        const { name } = req.params;
        const decodedName = decodeURIComponent(name)
        const teacher = await Teacher.find({ name });
        if (teacher.length > 0) {
            return res.json(teacher);
        }
        return res.status(404).send('Teacher with the specified name does not exist');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    getAllTeachers,
    getTeacherById,
    getTeacherByEmail,
    getTeacherByName,
    createTeacher,
    updateTeacher,
    deleteTeacher,

}