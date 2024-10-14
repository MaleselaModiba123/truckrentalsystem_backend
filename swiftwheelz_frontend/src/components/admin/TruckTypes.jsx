// components/TruckTypes.jsx
import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    createTruckType,
    deleteTruckTypeById,
    getAllTruckTypes,
    updateTruckType
} from '../../services/TruckTypeService.js';

function TruckTypes() {
    const [truckTypes, setTruckTypes] = useState([]);
    const [filteredTruckTypes, setFilteredTruckTypes] = useState([]);
    const [formState, setFormState] = useState({
        typeName: '',
        description: '',
        dimensions: '',
        capacity: 0,
        transmission: 'Automatic',
        fuelConsumption: 0,
        fuelType: 'Diesel'
    });
    const [selectedTruckType, setSelectedTruckType] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
    const [actionType, setActionType] = useState('add'); // 'add' or 'update'
    const [truckTypeToDelete, setTruckTypeToDelete] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');
    useEffect(() => {
        fetchTruckTypes();
    }, []);

    const fetchTruckTypes = async () => {
        try {
            const response = await getAllTruckTypes(token);
            setTruckTypes(response.data);
            setFilteredTruckTypes(response.data);
        } catch (error) {
            console.error('Error fetching truck types:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormState({
            ...formState,
            [name]: type === 'number' ? parseFloat(value) : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (actionType === 'update') {
            setIsSubmitDialogOpen(true);
        } else {
            performSubmit();
        }
    };

    const performSubmit = async () => {
        try {
            let updatedTruckTypes = [...truckTypes];
            if (actionType === 'add') {
                const response = await createTruckType(formState,token);
                updatedTruckTypes.push(response.data);
            } else if (actionType === 'update') {
                const response = await updateTruckType(selectedTruckType.truckTypeId, formState,token);
                updatedTruckTypes = updatedTruckTypes.map(tt =>
                    tt.truckTypeId === response.data.truckTypeId ? response.data : tt
                );
            }
            setTruckTypes(updatedTruckTypes);
            setFilteredTruckTypes(updatedTruckTypes);
            resetFormState();
        } catch (error) {
            console.error('Error submitting truck type:', error);
        }
        setIsSubmitDialogOpen(false);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setFilteredTruckTypes(truckTypes.filter(truckType =>
            truckType.typeName.toLowerCase().includes(value.toLowerCase()) ||
            truckType.description.toLowerCase().includes(value.toLowerCase())
        ));
    };

    const handleEdit = (truckType) => {
        setFormState(truckType);
        setSelectedTruckType(truckType);
        setActionType('update');
    };

    const handleDelete = (truckType) => {
        setTruckTypeToDelete(truckType);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        try {
            if (truckTypeToDelete) {
                await deleteTruckTypeById(truckTypeToDelete.truckTypeId,token);
                const updatedTruckTypes = truckTypes.filter(tt => tt.truckTypeId !== truckTypeToDelete.truckTypeId);
                setTruckTypes(updatedTruckTypes);
                setFilteredTruckTypes(updatedTruckTypes);
            }
        } catch (error) {
            console.error('Error deleting truck type:', error);
        }
        setIsDeleteDialogOpen(false);
        setTruckTypeToDelete(null);
    };

    const cancelDelete = () => {
        setIsDeleteDialogOpen(false);
        setTruckTypeToDelete(null);
    };

    const resetFormState = () => {
        setFormState({
            typeName: '',
            description: '',
            dimensions: '',
            capacity: 0,
            transmission: 'Automatic',
            fuelConsumption: 0,
            fuelType: 'Diesel'
        });
        setSelectedTruckType(null);
        setActionType('add');
    };
    return (
        <Container maxWidth="md" sx={{mt: 4,ml:0}}>
            <Typography variant="h4" gutterBottom  sx={{ fontWeight: 'bold' }}>
                Truck Types
            </Typography>
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(-20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    h1, h2,h4 {
                        animation: fadeIn 1s ease-out;
                        color: #007bff; /* Blue color */
                        font-size: 2.5rem; /* Font size */
                        font-weight: bold; /* Font weight */
                    }
                `}
            </style>
            <Grid container spacing={2} mb={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Search Truck Types"
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon/>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2} mb={4}>
                <Grid item xs={12} md={6}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Type Name"
                            name="typeName"
                            value={formState.typeName}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Description"
                            name="description"
                            value={formState.description}
                            onChange={handleChange}
                            fullWidth
                            required
                            multiline
                            rows={4}
                            margin="normal"
                        />
                        <TextField
                            label="Dimensions (Length*Width*Height in meters)"
                            name="dimensions"
                            value={formState.dimensions}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Capacity (tons)"
                            name="capacity"
                            type="number"
                            value={formState.capacity}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                            inputProps={{min: 0, step: '0.01'}}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Transmission</InputLabel>
                            <Select
                                name="transmission"
                                value={formState.transmission}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="Automatic">Automatic</MenuItem>
                                <MenuItem value="Manual">Manual</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Fuel Consumption (km per liter)"
                            name="fuelConsumption"
                            type="number"
                            value={formState.fuelConsumption}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                            inputProps={{min: 0, step: '0.01'}}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Fuel Type</InputLabel>
                            <Select
                                name="fuelType"
                                value={formState.fuelType}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="Diesel">Diesel</MenuItem>
                                <MenuItem value="Petrol">Petrol</MenuItem>
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary" sx={{mt: 2}}>
                            {selectedTruckType ? 'Update' : 'Add'} Truck Type
                        </Button>
                    </form>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Truck Types List
                    </Typography>
                    <div style={{maxHeight: '600px', overflowY: 'auto'}}>
                        <List>
                            {filteredTruckTypes && filteredTruckTypes.length > 0 ? (
                                filteredTruckTypes.map((truckType) => (
                                    <ListItem
                                        key={truckType.truckTypeId}
                                        secondaryAction={
                                            <>
                                                <IconButton edge="end" onClick={() => handleEdit(truckType)}>
                                                    <EditIcon sx={{ color: '#ffc107' }} />
                                                </IconButton>
                                                <IconButton edge="end" onClick={() => handleDelete(truckType)}>
                                                    <DeleteIcon sx={{ color: '#dc3545' }} />
                                                </IconButton>
                                            </>
                                        }
                                    >
                                        <ListItemText
                                            primary={truckType.typeName}
                                            secondary={
                                                <>
                                                    <span>Description: {truckType.description}</span><br/>
                                                    <span>Dimensions: {truckType.dimensions}</span><br/>
                                                    <span>Capacity: {truckType.capacity} tons</span><br/>
                                                    <span>Fuel Type: {truckType.fuelType}</span><br/>
                                                    <span>Transmission: {truckType.transmission}</span><br/>
                                                    <span>Fuel Consumption: {truckType.fuelConsumption} km/liter</span>
                                                </>
                                            }
                                        />
                                    </ListItem>
                                ))
                            ) : (
                                <ListItem>
                                    <ListItemText primary="No truck types found." />
                                </ListItem>
                            )}
                        </List>
                    </div>
                </Grid>
            </Grid>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={isDeleteDialogOpen}
                onClose={cancelDelete}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this truck type?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="secondary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Submit Confirmation Dialog */}
            <Dialog
                open={isSubmitDialogOpen}
                onClose={() => setIsSubmitDialogOpen(false)}
            >
                <DialogTitle>Confirm Submission</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to {actionType} this truck type?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsSubmitDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={performSubmit} color="secondary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default TruckTypes;
