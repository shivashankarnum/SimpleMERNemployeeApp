import { EmployeesContext } from "../context/EmployeesContext"
import { useContext } from "react"

export const useEmployeesContext = () => {
  const context = useContext(EmployeesContext)

  if(!context) {
    throw Error('useEmployeesContext must be used inside a employeesContextProvider')
  }

  return context
}