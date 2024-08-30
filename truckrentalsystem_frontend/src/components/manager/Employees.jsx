import React, {useEffect, useState} from 'react';
import {createEmployee, deleteEmployeeById, getEmployees, updateEmployee} from "../../services/EmployeesService.js";

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({
        name: {
            firstName: '',
            middleName: '',
            lastName: ''
        },
        contact: {
            email: '',
            cellNumber: ''
        },
        address: {
            street: '',
            city: '',
            province: '',
            postalCode: '',
            country: ''
        },
        password: '',
        role: 'MANAGER'
    });
    const [editing, setEditing] = useState(false);
    const [currentEmployeeNumber, setCurrentEmployeeNumber] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const response = await getEmployees();
        setEmployees(response.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleNestedChange = (e, nestedField) => {
        const {name, value} = e.target;
        setNewEmployee(prevState => ({
            ...prevState,
            [nestedField]: {
                ...prevState[nestedField],
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            await updateEmployee(currentEmployeeNumber, newEmployee);
        } else {
            await createEmployee(newEmployee);
        }
        setEditing(false);
        fetchEmployees();

        // Clear the form
        setNewEmployee({
            name: {
                firstName: '',
                middleName: '',
                lastName: ''
            },
            contact: {
                email: '',
                cellNumber: ''
            },
            address: {
                street: '',
                city: '',
                province: '',
                postalCode: '',
                country: ''
            },
            password: '',
            role: 'MANAGER'
        });
        setCurrentEmployeeNumber('');

        // Hide the modal
        const modalElement = document.getElementById('addEmployeeModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
            modal.hide();
        }
    };

    const handleEdit = (employee) => {
        setNewEmployee({
            name: employee.name,
            contact: employee.contact,
            address: employee.address,
            password: employee.password,
            role: employee.role
        });
        setCurrentEmployeeNumber(employee.employeeNumber);
        setEditing(true);
        // Open the modal programmatically if needed
        const modal = new bootstrap.Modal(document.getElementById('addEmployeeModal'));
        modal.show();
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
                            <h1 className="modal-title fs-5"
                                id="exampleModalLabel">{editing ? 'Edit' : 'Add'} Employee</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                {!editing && (
                                    <>
                                        <div className="mb-3">
                                            <label htmlFor="firstName" className="form-label">First Name</label>
                                            <input className="form-control" type="text" name="firstName"
                                                   value={newEmployee.name.firstName}
                                                   onChange={(e) => handleNestedChange(e, 'name')}
                                                   placeholder="First Name" required/>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="middleName" className="form-label">Middle Name</label>
                                            <input className="form-control" type="text" name="middleName"
                                                   value={newEmployee.name.middleName}
                                                   onChange={(e) => handleNestedChange(e, 'name')}
                                                   placeholder="Middle Name"/>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="lastName" className="form-label">Last Name</label>
                                            <input className="form-control" type="text" name="lastName"
                                                   value={newEmployee.name.lastName}
                                                   onChange={(e) => handleNestedChange(e, 'name')}
                                                   placeholder="Last Name" required/>
                                        </div>
                                    </>
                                )}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input className="form-control" type="email" name="email"
                                           value={newEmployee.contact.email}
                                           onChange={(e) => handleNestedChange(e, 'contact')} placeholder="Email"
                                           required/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="cellNumber" className="form-label">Cell Number</label>
                                    <input className="form-control" type="text" name="cellNumber"
                                           value={newEmployee.contact.cellNumber}
                                           onChange={(e) => handleNestedChange(e, 'contact')} placeholder="Cell Number"
                                           required/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="street" className="form-label">Street</label>
                                    <input className="form-control" type="text" name="street"
                                           value={newEmployee.address.street}
                                           onChange={(e) => handleNestedChange(e, 'address')} placeholder="Street"
                                           required/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input className="form-control" type="text" name="city"
                                           value={newEmployee.address.city}
                                           onChange={(e) => handleNestedChange(e, 'address')} placeholder="City"
                                           required/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="province" className="form-label">Province</label>
                                    <input className="form-control" type="text" name="province"
                                           value={newEmployee.address.province}
                                           onChange={(e) => handleNestedChange(e, 'address')} placeholder="Province"
                                           required/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="postalCode" className="form-label">Postal Code</label>
                                    <input className="form-control" type="text" name="postalCode"
                                           value={newEmployee.address.postalCode}
                                           onChange={(e) => handleNestedChange(e, 'address')} placeholder="Postal Code"
                                           required/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <input className="form-control" type="text" name="country"
                                           value={newEmployee.address.country}
                                           onChange={(e) => handleNestedChange(e, 'address')} placeholder="Country"
                                           required/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input className="form-control" type="password" name="password"
                                           value={newEmployee.password} onChange={handleChange} placeholder="Password"
                                           required/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="role" className="form-label">Role</label>
                                    <select className="form-select" name="role" value={newEmployee.role}
                                            onChange={handleChange} required>
                                        <option value="MANAGER">MANAGER</option>
                                        <option value="MECHANIC">MECHANIC</option>
                                    </select>
                                </div>

                                <div className="d-grid gap-2">
                                    <button className="btn btn-primary"
                                            type="submit">{editing ? 'Update' : 'Add'} Employee
                                    </button>
                                </div>
                            </form>
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
                    <th scope="col">Role</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {employees.map((employee) => (
                    <tr key={employee.employeeNumber}>
                        <th scope="row">{employee.employeeNumber}</th>
                        <td>{employee.name.firstName}</td>
                        <td>{employee.name.lastName}</td>
                        <td>{employee.contact.email}</td>
                        <td>{employee.role}</td>
                        <td>
                            <button className="btn btn-primary" onClick={() => handleEdit(employee)}>Edit</button>
                        </td>
                        <td>
                            <button className="btn btn-danger"
                                    onClick={() => handleDelete(employee.employeeNumber)}>Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Employees;
