// components/TruckTypes.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Container,
    Grid,
    TextField,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    InputAdornment,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTruckType, getAllTruckTypes, updateTruckType, deleteTruckTypeById } from '../../services/TruckTypeService.js';

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
    const [actionType, setActionType] = useState(''); // 'add', 'update', or 'delete'
    const [truckTypeToDelete, setTruckTypeToDelete] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchTruckTypes();

        if (location.state && location.state.newTruckTypeId) {
            setFormState({
                ...formState,
                truckTypeId: location.state.newTruckTypeId
            });
        }
    }, [location.state]);

    const fetchTruckTypes = async () => {
        try {
            const response = await getAllTruckTypes();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let updatedTruckTypes = [...truckTypes];
            if (actionType === 'add') {
                const response = await createTruckType(formState);
                updatedTruckTypes.push(response.data);
                navigate('/trucks', { state: { newTruckTypeId: response.data.truckTypeId } });
            } else if (actionType === 'update') {
                const updatedTruckType = await updateTruckType(selectedTruckType.truckTypeId, formState);
                updatedTruckTypes = updatedTruckTypes.map(tt => tt.truckTypeId === updatedTruckType.data.truckTypeId ? updatedTruckType.data : tt);
                navigate('/truck-types');
            }
            setTruckTypes(updatedTruckTypes);
            setFilteredTruckTypes(updatedTruckTypes);
            resetFormState();
        } catch (error) {
            console.error('Error submitting truck type:', error);
            alert('Failed to submit truck type. Please try again.');
        }
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
                await deleteTruckTypeById(truckTypeToDelete.truckTypeId);
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

    const openSubmitDialog = (type) => {
        setActionType(type);
        setIsSubmitDialogOpen(true);
    };

    const handleSubmitDialogClose = () => {
        setIsSubmitDialogOpen(false);
    };

    const handleSubmitDialogConfirm = () => {
        handleSubmit();
        handleSubmitDialogClose();
    };


    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                Truck Types
            </Typography>

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
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2} mb={4}>
                <Grid item xs={12} md={6}>
                    <form onSubmit={(e) => openSubmitDialog(selectedTruckType ? 'update' : 'add')}>
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
                            inputProps={{ min: 0, step: '0.01' }}
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
                            inputProps={{ min: 0, step: '0.01' }}
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
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                            {selectedTruckType ? 'Update' : 'Add'} Truck Type
                        </Button>
                    </form>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                        Truck Types List
                    </Typography>
                    <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                        <List>
                            {filteredTruckTypes.map((truckType) => (
                                <ListItem
                                    key={truckType.truckTypeId}
                                    secondaryAction={
                                        <>
                                            <IconButton edge="end" onClick={() => handleEdit(truckType)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton edge="end" onClick={() => handleDelete(truckType)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    }
                                >
                                    <ListItemText
                                        primary={`${truckType.typeName} - ${truckType.capacity} tons`}
                                        secondary={
                                            <>
                                                <Typography variant="body2">
                                                    {truckType.description}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Dimensions: {truckType.dimensions}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Fuel Type: {truckType.fuelType}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Transmission: {truckType.transmission}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Fuel Consumption: {truckType.fuelConsumption} km/l
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Grid>
            </Grid>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this truck type?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Submit Confirmation Dialog */}
            <Dialog
                open={isSubmitDialogOpen}
                onClose={handleSubmitDialogClose}
            >
                <DialogTitle>{actionType === 'add' ? 'Add Truck Type' : 'Update Truck Type'}</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to {actionType === 'add' ? 'add' : 'update'} this truck type?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmitDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmitDialogConfirm} color="secondary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default TruckTypes;
