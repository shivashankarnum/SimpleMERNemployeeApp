const mongoose = require('mongoose')

const Schema = mongoose.Schema

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  qual: {
    type: String,
    required: true
  },
  dept: {
    type: String,
    required: true
  },
  doj: {
    type: String,
    required: true
  }

}, { timestamps: true })

module.exports = mongoose.model('employees', employeeSchema)
