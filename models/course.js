const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const Course = new Schema(
    {
       name: {type: String, required: true},
       schedule: [{type: String, enum: ['mon','tues','wed','thurs','fri'], required: true}],
       durationInMinutes: {type: Number, required: true},
       courseCode: {type: Number, required: true, minimum: 5}, 
       seatsAvailable: {type: Number, required: true},
    },
    {timestamps: true},
)

module.exports = Course