const express = require('express')
const {
  getEmployees, 
  getEmployee, 
  createEmployee, 
  deleteEmployee, 
  updateEmployee
} = require('../controllers/employeeController')

const router = express.Router()

// GET all employees
router.get('/', getEmployees)

// GET a single employee
router.get('/:id', getEmployee)

// POST a new employee
router.post('/', createEmployee)

// DELETE a employee
router.delete('/:id', deleteEmployee)

// UPDATE a employee
router.patch('/:id', updateEmployee)

module.exports = router
