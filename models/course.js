const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const Course = new Schema(
    {
       name: {type: String, required: true},
       schedule: {type: String, enum: ['mon','tues','wed','thurs','fri'], required: true},
       description: {type: String, required: true},
       courseCode: {type: Number, required: true}, 
       seatsAvalible: {type: Number, required: true},
       teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'},
       students:[ {type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'}]
    },
    {timestamps: true},
)

module.exports = Course