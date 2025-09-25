import { useEmployeesContext } from '../hooks/useEmployeesContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const EmployeeDetails = ({ employee }) => {
  const { dispatch } = useEmployeesContext()

  const handleClick = async () => {
    const response = await fetch('/api/employees/' + employee._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_EMPLOYEE', payload: json})
    }
  }

  return (
    <div className="employee-details">
      <h4>{employee.name}</h4>
      <p><strong>Qualification: </strong>{employee.qual}</p>
      <p><strong>Department: </strong>{employee.dept}</p>
      <p><strong>Date of joining: </strong>{employee.doj}</p>
      <p>{formatDistanceToNow(new Date(employee.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default EmployeeDetails