import { useState } from 'react'
import { useEmployeesContext } from '../hooks/useEmployeesContext'

const EmployeeForm = () => {
  const { dispatch } = useEmployeesContext()

  const [name, setName] = useState('')
  const [qual, setQualification] = useState('')
  const [dept, setDepartment] = useState('')
  const [doj, setDateofjoining] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const employee = {name, qual, dept, doj}
    
    const response = await fetch('/api/employees', {
      method: 'POST',
      body: JSON.stringify(employee),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setName('')
      setQualification('')
      setDepartment('')
      setDateofjoining('')
      dispatch({type: 'CREATE_EMPLOYEE', payload: json})
    }

  }

  return (
    
      <form className="employee-form" onSubmit={handleSubmit}>
      <h3>Add New Employee</h3>

      <div className="form-group">
        <label>Full Name</label>
        <input 
          type="text" 
          onChange={(e) => setName(e.target.value)} 
          name="name"
          value={name}
          className={emptyFields.includes('name') ? 'error' : ''}
          placeholder="Enter full name"
          
        />
      </div>
            
      <div className="form-group">
        <label>Department</label>
        <select 
          name="department"
          onChange={(e) => setDepartment(e.target.value)} 
          value={dept}
          className={emptyFields.includes('department') ? 'error' : ''}          
        >
          <option value="">Select Department</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="HR">Human Resources</option>
          <option value="Finance">Finance</option>
          <option value="Operations">Operations</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Date of Joining</label>
        <input 
          type="text" 
          onChange={(e) => setDateofjoining(e.target.value)} 
          name="doj"
          value={doj}
          className={emptyFields.includes('doj') ? 'error' : ''}          
        />
      </div>
      <div className="form-group">
        <label>Qualification</label>
        <input 
          type="text" 
          onChange={(e) => setQualification(e.target.value)} 
          value={qual} 
          name={qual}          
          className={emptyFields.includes('qual') ? 'error' : ''}
        />
        </div>

        <button 
        type="submit" 
        className="submit-btn"
        >ADD AMPLOYEE
      </button>

      {error && <div className="error-message">{error}</div>}
    </form>
  )
}

export default EmployeeForm