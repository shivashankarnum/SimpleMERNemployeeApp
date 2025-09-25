const Employee = require('../models/employeeModel')
const mongoose = require('mongoose')

// get all employee
const getEmployees = async (req, res) => {
const employees = await Employee.find({}).sort({createdAt: -1})

  res.status(200).json(employees)
}

// get a single employee
const getEmployee = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such employee'})
  }
  const employee = await Employee.findById(id)

  if (!employee) {
    return res.status(404).json({error: 'No such employee'})
  }

  res.status(200).json(employee)
}

// create a new employee
const createEmployee = async (req, res) => {
  const {name, qual, dept, doj} = req.body

  // add to the database
  try {
    const employee = await Employee.create({ name, qual, dept, doj })
    res.status(200).json(employee)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a employee
const deleteEmployee = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such employee'})
  }

  const employee = await Employee.findOneAndDelete({_id: id})

  if(!employee) {
    return res.status(400).json({error: 'No such employee'})
  }

  res.status(200).json(employee)
}

// update a employee
const updateEmployee = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such employee'})
  }

  const employee = await Employee.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!employee) {
    return res.status(400).json({error: 'No such employee'})
  }

  res.status(200).json(employee)
}

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee
}
