const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const Student = new Schema(
    {
      name: {type: String, required: true},
      email: {type: String, required: true},
      grade: {type: String, enum: ['freshman', 'sophomore', 'junior', 'senior']},
      isadmin: {type: Boolean, required: true},
      profilePicture: {type: String },
      course: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'}
    },
    {timestamps: true},
)

module.exports = Student