// src/components/Employees.js
import React, { useState, useEffect } from 'react';
import {getEmployees,deleteEmployeeById,updateEmployee,createEmployee,getEmployeeById} from "../services/EmployeesService.js";

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        employeeType: 'Manager',
        wages: 0,
        hours: 0
    });
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const response = await getEmployees();
        setEmployees(response.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            await updateEmployee(newEmployee.employeeNumber, newEmployee);
        } else {
            await createEmployee(newEmployee);
        }
        setEditing(false);
        fetchEmployees();
    };

    const handleEdit = (employee) => {
        setNewEmployee(employee);
        setEditing(true);
    };

    const handleDelete = async (employeeNumber) => {
        await deleteEmployeeById(employeeNumber);
        fetchEmployees();
    };

    return (
        <div>
            <h2>Employees</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" value={newEmployee.firstName} onChange={handleChange} placeholder="First Name" required />
                <input type="text" name="lastName" value={newEmployee.lastName} onChange={handleChange} placeholder="Last Name" required />
                <input type="email" name="email" value={newEmployee.email} onChange={handleChange} placeholder="Email" required />
                <input type="password" name="password" value={newEmployee.password} onChange={handleChange} placeholder="Password" required />
                <select name="employeeType" value={newEmployee.employeeType} onChange={handleChange} required>
                    <option value="Manager">Manager</option>
                    <option value="Mechanic">Mechanic</option>
                    <option value="Rental Agent">Rental Agent</option>
                </select>
                <input type="number" name="wages" value={newEmployee.wages} onChange={handleChange} placeholder="Wages" required />
                <input type="number" name="hours" value={newEmployee.hours} onChange={handleChange} placeholder="Hours" required />
                <button type="submit">{editing ? 'Update' : 'Add'} Employee</button>
            </form>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.employeeNumber}>
                        {employee.firstName} {employee.lastName} - {employee.email}
                        <button onClick={() => handleEdit(employee)}>Edit</button>
                        <button onClick={() => handleDelete(employee.employeeNumber)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Employees;
