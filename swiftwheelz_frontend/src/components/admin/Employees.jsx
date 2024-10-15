import React, { useEffect, useState } from 'react';
import {
    createEmployee,
    deleteEmployeeById,
    getEmployees,
    updateEmployee
} from "../../services/EmployeesService.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {
    Box,
    Button,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Snackbar,
    TextField,
    Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Table } from "react-bootstrap";

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [newEmployee, setNewEmployee] = useState({
        name: { firstName: '', middleName: '', lastName: '' },
        contact: { email: '', cellNumber: '' },
        address: { street: '', city: '', province: '', postalCode: '', country: '' },
        password: '',
        role: 'ADMIN'
    });
    const [editing, setEditing] = useState(false);
    const [currentEmployeeNumber, setCurrentEmployeeNumber] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [confirmUpdateOpen, setConfirmUpdateOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        filterEmployees(searchQuery);
    }, [employees, searchQuery]);

    const fetchEmployees = async () => {
        const response = await getEmployees(token);
        setEmployees(response.data);
    };

    const filterEmployees = (query) => {
        if (!query) {
            setFilteredEmployees(employees);
        } else {
            setFilteredEmployees(employees.filter(employee =>
                employee.name.firstName.toLowerCase().includes(query.toLowerCase()) ||
                employee.name.lastName.toLowerCase().includes(query.toLowerCase()) ||
                employee.contact.email.toLowerCase().includes(query.toLowerCase())
            ));
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleNestedChange = (e, nestedField) => {
        const { name, value } = e.target;
        setNewEmployee(prevState => ({
            ...prevState,
            [nestedField]: {
                ...prevState[nestedField],
                [name]: value
            }
        }));
    };

    const handleSubmit = () => {
        if (editing) {
            setConfirmUpdateOpen(true);
        } else {
            handleCreateEmployee();
        }
    };

    const handleCreateEmployee = async () => {
        await createEmployee(newEmployee, token);
        setSnackbarMessage('Employee added successfully!');
        fetchEmployees();
        clearForm();
        setModalOpen(false);
        setSnackbarOpen(true);
    };

    const handleConfirmUpdate = async () => {
        await updateEmployee(currentEmployeeNumber, newEmployee, token);
        setSnackbarMessage('Employee updated successfully!');
        fetchEmployees();
        clearForm();
        setModalOpen(false);
        setSnackbarOpen(true);
        setConfirmUpdateOpen(false);
        setEditing(false);
    };

    const clearForm = () => {
        setNewEmployee({
            name: { firstName: '', middleName: '', lastName: '' },
            contact: { email: '', cellNumber: '' },
            address: { street: '', city: '', province: '', postalCode: '', country: '' },
            password: '',
            role: 'ADMIN'
        });
        setCurrentEmployeeNumber('');
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
        setModalOpen(true);
    };

    const handleDeleteConfirmation = (employeeNumber) => {
        setEmployeeToDelete(employeeNumber);
        setConfirmDeleteOpen(true);
    };

    const handleDelete = async () => {
        await deleteEmployeeById(employeeToDelete, token);
        fetchEmployees();
        setConfirmDeleteOpen(false);
        setEmployeeToDelete(null);
        setSnackbarMessage('Employee deleted successfully!');
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div>
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(-20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    h1, h2,h3,h4 {
                        animation: fadeIn 1s ease-out;
                        color: #007bff; /* Blue color */
                        font-size: 2.5rem; /* Font size */
                        font-weight: bold; /* Font weight */
                    }
                `}
            </style>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Employees
            </Typography>
            <Box marginBottom={2}>
                <TextField
                    label="Search Employees"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <Box marginBottom={2}>
                <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
                    Add Employee
                </Button>
            </Box>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <Box
                    bgcolor="background.paper"
                    p={2}
                    mx="auto"
                    my={4}
                    maxWidth={500}
                    borderRadius={2}
                    height="90vh"
                    overflow="auto"
                >
                    <Typography variant="h5" component="h1" gutterBottom>
                        {editing ? 'Edit' : 'Add'} Employee
                    </Typography>
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                        {!editing && (
                            <>
                                <TextField
                                    label="First Name"
                                    name="firstName"
                                    value={newEmployee.name.firstName}
                                    onChange={(e) => handleNestedChange(e, 'name')}
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                                <TextField
                                    label="Middle Name"
                                    name="middleName"
                                    value={newEmployee.name.middleName}
                                    onChange={(e) => handleNestedChange(e, 'name')}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Last Name"
                                    name="lastName"
                                    value={newEmployee.name.lastName}
                                    onChange={(e) => handleNestedChange(e, 'name')}
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                            </>
                        )}
                        <TextField
                            label="Email Address"
                            name="email"
                            type="email"
                            value={newEmployee.contact.email}
                            onChange={(e) => handleNestedChange(e, 'contact')}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Cell Number"
                            name="cellNumber"
                            value={newEmployee.contact.cellNumber}
                            onChange={(e) => handleNestedChange(e, 'contact')}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Street"
                            name="street"
                            value={newEmployee.address.street}
                            onChange={(e) => handleNestedChange(e, 'address')}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="City"
                            name="city"
                            value={newEmployee.address.city}
                            onChange={(e) => handleNestedChange(e, 'address')}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Province"
                            name="province"
                            value={newEmployee.address.province}
                            onChange={(e) => handleNestedChange(e, 'address')}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Postal Code"
                            name="postalCode"
                            value={newEmployee.address.postalCode}
                            onChange={(e) => handleNestedChange(e, 'address')}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Country"
                            name="country"
                            value={newEmployee.address.country}
                            onChange={(e) => handleNestedChange(e, 'address')}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={newEmployee.password}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel>Role</InputLabel>
                            <Select
                                name="role"
                                value={newEmployee.role}
                                onChange={handleChange}
                            >
                                <MenuItem value="ADMIN">ADMIN</MenuItem>
                                <MenuItem value="HELP_DESK">HELP DESK</MenuItem>
                            </Select>
                        </FormControl>
                        <Box display="flex" justifyContent="space-between" marginTop={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                {editing ? 'Update' : 'Add'} Employee
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => {
                                    clearForm();
                                    setEditing(false);
                                    setModalOpen(false);
                                }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>

            <Modal open={confirmUpdateOpen} onClose={() => setConfirmUpdateOpen(false)}>
                <Box
                    bgcolor="background.paper"
                    p={2}
                    mx="auto"
                    my={4}
                    maxWidth={400}
                    borderRadius={2}
                >
                    <Typography variant="h6" gutterBottom>
                        Are you sure you want to update this employee?
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleConfirmUpdate}
                        style={{ marginRight: '8px' }}
                    >
                        Yes
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setConfirmUpdateOpen(false)}
                    >
                        No
                    </Button>
                </Box>
            </Modal>

            <Modal open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
                <Box
                    bgcolor="background.paper"
                    p={2}
                    mx="auto"
                    my={4}
                    maxWidth={400}
                    borderRadius={2}
                >
                    <Typography variant="h6" gutterBottom>
                        Are you sure you want to delete this employee?
                    </Typography>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                        style={{ marginRight: '8px' }}
                    >
                        Yes
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setConfirmDeleteOpen(false)}
                    >
                        No
                    </Button>
                </Box>
            </Modal>

            <Box
                sx={{
                    position: 'fixed',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1300, // Ensure it appears above other components
                }}
            >
                <Snackbar
                    open={snackbarOpen}
                    onClose={handleSnackbarClose}
                    message={snackbarMessage}
                    autoHideDuration={3000}
                />
            </Box>

            <Table striped bordered hover className="table-sm">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredEmployees && filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                        <tr key={employee.employeeNumber}>
                            <th scope="row">{employee.employeeNumber}</th>
                            <td>{employee.name.firstName}</td>
                            <td>{employee.name.lastName}</td>
                            <td>{employee.contact.email}</td>
                            <td>{employee.role}</td>
                            <td>
                                <Button
                                    variant="contained"
                                    color="warning"
                                    onClick={() => handleEdit(employee)} className="me-2"
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleDeleteConfirmation(employee.employeeNumber)}
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6">No employees found</td>
                    </tr>
                )}
                </tbody>
            </Table>
        </div>
    );
}

export default Employees;
