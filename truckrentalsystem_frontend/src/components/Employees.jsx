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
            newEmployee
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
            <div className="card">
                <div className="card-body">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addEmployeeModal">
                        Add Employee
                    </button>
                </div>
            </div>
            <div className="modal fade" id="addEmployeeModal" tabIndex="-1" aria-labelledby="addEmployeeModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">Close</button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">First name</label>
                                <input className="form-control" type="text" name="firstName" value={newEmployee.firstName} onChange={handleChange} placeholder="First Name" required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">Last name</label>
                                <input className="form-control" type="text" name="lastName" value={newEmployee.lastName} onChange={handleChange} placeholder="Last Name" required />

                            </div>

                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">Email address</label>
                                <input className="form-control" type="email" name="email" value={newEmployee.email} onChange={handleChange} placeholder="Email" required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">Password</label>
                                <input className="form-control" type="password" name="password" value={newEmployee.password} onChange={handleChange} placeholder="Password" required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">Employee type</label>
                                <select className="form-select" name="employeeType" value={newEmployee.employeeType} onChange={handleChange} required>
                                    <option value="Manager">Manager</option>
                                    <option value="Mechanic">Mechanic</option>
                                    <option value="Rental Agent">Rental Agent</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">Wages</label>
                                <input className="form-control" type="number" name="wages" value={newEmployee.wages} onChange={handleChange} placeholder="Wages" required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">Hourly rate</label>
                                <input className="form-control" type="number" name="hours" value={newEmployee.hours} onChange={handleChange} placeholder="Hours" required />
                            </div>

                            <div className="d-grid gap-2">
                                <button className="btn btn-primary" type="submit">{editing ? 'Update' : 'Add'} Employee</button>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
                </div>

            <table className="table table-striped-columns">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.employeeNumber} >
                            <th scope="row">{employee.employeeNumber}</th>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td><button className="btn btn-primary" onClick={() => handleEdit(employee)}>Edit</button></td>
                            <td><button className="btn btn-primary" onClick={() => handleDelete(employee.employeeNumber)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Employees;
