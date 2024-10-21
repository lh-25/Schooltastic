const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const Teacher = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        subject: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
        isadmin: {type: Boolean, required: true},
        profilePicture: {type: String },
      },
      {timestamps: true},
  )

module.exports = Teacher