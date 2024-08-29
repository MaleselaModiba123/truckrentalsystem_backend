import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Button, Grid, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { getAllInsurance, deleteInsuranceById, updateInsurance, createInsurance } from "../../services/InsuranceService.js";

const InsuranceList = () => {
    const [insurances, setInsurances] = useState([]);
    const [filter, setFilter] = useState('');
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [isSaveConfirmDialogOpen, setIsSaveConfirmDialogOpen] = useState(false);
    const [insuranceToDelete, setInsuranceToDelete] = useState(null);

    useEffect(() => {
        fetchInsurances();
    }, []);

    const fetchInsurances = async () => {
        try {
            const response = await getAllInsurance();
            setInsurances(response.data);
        } catch (error) {
            console.error('Error fetching insurances:', error);
        }
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filteredInsurances = insurances.filter((insurance) =>
        insurance.insuranceType.toLowerCase().includes(filter.toLowerCase()) ||
        insurance.policyNumber.toLowerCase().includes(filter.toLowerCase())
    );

    const handleEdit = (insurance) => {
        setFormData(insurance);
        setEditing(true);
        setIsModalOpen(true);
    };

    const handleDelete = (insurance) => {
        setInsuranceToDelete(insurance);
        setIsConfirmDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (insuranceToDelete) {
            try {
                await deleteInsuranceById(insuranceToDelete.insuranceID);
                fetchInsurances();
                setInsuranceToDelete(null);
            } catch (error) {
                console.error('Error deleting insurance:', error);
            }
        }
        setIsConfirmDialogOpen(false);
    };

    const handleAdd = () => {
        setFormData({});
        setEditing(false);
        setIsModalOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaveConfirmDialogOpen(true);  // Open save confirmation dialog
    };

    const confirmSave = async () => {
        try {
            if (editing) {
                await updateInsurance(formData.insuranceID, formData);
            } else {
                await createInsurance(formData);
            }
            setIsModalOpen(false);
            fetchInsurances();
        } catch (error) {
            console.error('Error saving insurance:', error);
        }
        setIsSaveConfirmDialogOpen(false);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCancelDelete = () => {
        setInsuranceToDelete(null);
        setIsConfirmDialogOpen(false);
    };

    const handleCancelSave = () => {
        setIsSaveConfirmDialogOpen(false);
    };

    return (
        <Box padding={2}>
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(-20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    h1, h2 {
                        animation: fadeIn 1s ease-out;
                        color: #007bff; /* Blue color */
                        font-size: 2.5rem; /* Font size */
                        font-weight: bold; /* Font weight */
                    }
                `}
            </style>
            <input
                type="text"
                placeholder="Filter by Insurance Type or Policy Number"
                value={filter}
                onChange={handleFilterChange}
                style={{marginBottom: '20px', padding: '10px', width: '100%'}}
            />
            <Button variant="contained" color="primary" onClick={handleAdd}>
                Add Insurance
            </Button>
            <Grid container spacing={2} marginTop={2}>
                {filteredInsurances.map((insurance) => (
                    <Grid item xs={12} sm={6} md={4} key={insurance.insuranceID}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{insurance.insuranceType}</Typography>
                                <Typography color="textSecondary">Provider: {insurance.provider}</Typography>
                                <Typography color="textSecondary">Policy Number: {insurance.policyNumber}</Typography>
                                <Typography color="textSecondary">Effective Date: {insurance.effectiveDate}</Typography>
                                <Typography color="textSecondary">Coverage: {insurance.coverage}</Typography>
                                <Typography color="textSecondary">Premium: {insurance.premium}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleEdit(insurance)}>Edit</Button>
                                <Button size="small" onClick={() => handleDelete(insurance)}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Modal for adding/editing insurance */}
            {isModalOpen && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                            width: '400px',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            {editing ? 'Edit Insurance' : 'Add Insurance'}
                        </Typography>
                        <form onSubmit={handleSave}>
                            <label>
                                Insurance Type:
                                <input
                                    type="text"
                                    name="insuranceType"
                                    value={formData.insuranceType || ''}
                                    onChange={handleChange}
                                    required
                                    style={{width: '100%', padding: '8px', marginBottom: '8px'}}
                                />
                            </label>
                            <label>
                                Provider:
                                <input
                                    type="text"
                                    name="provider"
                                    value={formData.provider || ''}
                                    onChange={handleChange}
                                    required
                                    style={{width: '100%', padding: '8px', marginBottom: '8px'}}
                                />
                            </label>
                            <label>
                                Policy Number:
                                <input
                                    type="text"
                                    name="policyNumber"
                                    value={formData.policyNumber || ''}
                                    onChange={handleChange}
                                    required
                                    style={{width: '100%', padding: '8px', marginBottom: '8px'}}
                                />
                            </label>
                            <label>
                                Effective Date:
                                <input
                                    type="date"
                                    name="effectiveDate"
                                    value={formData.effectiveDate || ''}
                                    onChange={handleChange}
                                    required
                                    style={{width: '100%', padding: '8px', marginBottom: '8px'}}
                                />
                            </label>
                            <label>
                                Coverage:
                                <input
                                    type="text"
                                    name="coverage"
                                    value={formData.coverage || ''}
                                    onChange={handleChange}
                                    required
                                    style={{width: '100%', padding: '8px', marginBottom: '8px'}}
                                />
                            </label>
                            <label>
                                Premium:
                                <input
                                    type="text"
                                    name="premium"
                                    value={formData.premium || ''}
                                    onChange={handleChange}
                                    required
                                    style={{width: '100%', padding: '8px', marginBottom: '8px'}}
                                />
                            </label>
                            <Box>
                                <Button type="submit" variant="contained" color="primary">
                                    Save
                                </Button>
                                <Button type="button" variant="outlined" color="secondary" onClick={handleCloseModal}
                                        sx={{marginLeft: '10px'}}>
                                    Cancel
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            )}

            {/* Confirmation Dialog for Deletion */}
            <Dialog
                open={isConfirmDialogOpen}
                onClose={handleCancelDelete}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this insurance?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={confirmDelete} color="primary">
                        Yes
                    </Button>
                    <Button onClick={handleCancelDelete} color="secondary">
                        No
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Confirmation Dialog for Save */}
            <Dialog
                open={isSaveConfirmDialogOpen}
                onClose={handleCancelSave}
            >
                <DialogTitle>Confirm Save</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to save these changes?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={confirmSave} color="primary">
                        Yes
                    </Button>
                    <Button onClick={handleCancelSave} color="secondary">
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default InsuranceList;
