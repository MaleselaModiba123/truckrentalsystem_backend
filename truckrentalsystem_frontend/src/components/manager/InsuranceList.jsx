import React, { useEffect, useState } from 'react';
import {
    createInsurance,
    deleteInsuranceById,
    getAllInsurance,
    updateInsurance
} from "../../services/InsuranceService.js";

const styles = {
    container: {
        marginTop: '50px',
    },
    table: {
        width: '100%',
        marginBottom: '20px',
        borderCollapse: 'collapse',
    },
    thTd: {
        border: '1px solid #dee2e6',
        padding: '8px',
        textAlign: 'center',
        verticalAlign: 'middle',
    },
    th: {
        backgroundColor: '#f8f9fa',
        fontWeight: 'bold',
    },
    stripedRow: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    btn: {
        padding: '5px 10px',
        fontSize: '14px',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '4px',
    },
    btnEdit: {
        backgroundColor: '#007bff',
        color: 'white',
        marginRight: '5px',
    },
    btnDelete: {
        backgroundColor: '#dc3545',
        color: 'white',
    },
    btnAdd: {
        backgroundColor: '#28a745',
        color: 'white',
        padding: '10px 20px',
        marginTop: '20px',
    },
    modal: {
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
    },
    modalContent: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        width: '400px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    },
    close: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '24px',
        cursor: 'pointer',
    },
    formLabel: {
        display: 'block',
        marginBottom: '10px',
    },
    formInput: {
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    formButton: {
        marginRight: '10px',
    }
};

function InsuranceList() {
    const [insurances, setInsurances] = useState([]);
    const [formData, setFormData] = useState({
        insuranceID: '',
        insuranceType: '',
        provider: '',
        policyNumber: '',
        effectiveDate: '',
        coverage: '',
        premium: '',
    });
    const [editing, setEditing] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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

    const handleEdit = (insurance) => {
        setFormData(insurance);
        setEditing(true);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (insuranceID) => {
        try {
            console.log('Deleting insurance with ID:', insuranceID); // Debugging log
            await deleteInsuranceById(insuranceID);
            await fetchInsurances();
        } catch (error) {
            console.error('Error deleting insurance:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await updateInsurance(formData.insuranceID, formData);
            } else {
                await createInsurance(formData);
            }
            setEditing(false);
            setIsEditModalOpen(false);
            setIsAddModalOpen(false);
            await fetchInsurances();
        } catch (error) {
            console.error('Error saving insurance:', error);
        }
    };

    const handleAdd = () => {
        setFormData({
            insuranceID: '',
            insuranceType: '',
            provider: '',
            policyNumber: '',
            effectiveDate: '',
            coverage: '',
            premium: '',
        });
        setEditing(false);
        setIsAddModalOpen(true);
    };

    return (
        <div style={styles.container}>
            <table style={styles.table} className="table-striped table-hover">
                <thead>
                <tr>
                    <th style={{ ...styles.thTd, ...styles.th }}>Insurance ID</th>
                    <th style={{ ...styles.thTd, ...styles.th }}>Insurance Type</th>
                    <th style={{ ...styles.thTd, ...styles.th }}>Provider</th>
                    <th style={{ ...styles.thTd, ...styles.th }}>Policy Number</th>
                    <th style={{ ...styles.thTd, ...styles.th }}>Effective Date</th>
                    <th style={{ ...styles.thTd, ...styles.th }}>Coverage</th>
                    <th style={{ ...styles.thTd, ...styles.th }}>Premium</th>
                    <th style={{ ...styles.thTd, ...styles.th }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {insurances.map((insurance, index) => (
                    <tr
                        key={insurance.insuranceID}
                        style={index % 2 === 0 ? styles.stripedRow : {}}
                        className="hoveredRow"
                    >
                        <td style={styles.thTd}>{insurance.insuranceID}</td>
                        <td style={styles.thTd}>{insurance.insuranceType}</td>
                        <td style={styles.thTd}>{insurance.provider}</td>
                        <td style={styles.thTd}>{insurance.policyNumber}</td>
                        <td style={styles.thTd}>{insurance.effectiveDate}</td>
                        <td style={styles.thTd}>{insurance.coverage}</td>
                        <td style={styles.thTd}>{insurance.premium}</td>
                        <td style={styles.thTd}>
                            <button
                                style={{ ...styles.btn, ...styles.btnEdit }}
                                onClick={() => handleEdit(insurance)}
                            >
                                Edit
                            </button>
                            <button
                                style={{ ...styles.btn, ...styles.btnDelete }}
                                onClick={() => handleDelete(insurance.insuranceID)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button style={styles.btnAdd} onClick={handleAdd}>
                Add Insurance
            </button>

            {(isEditModalOpen || isAddModalOpen) && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <span
                            style={styles.close}
                            onClick={() => {
                                setIsEditModalOpen(false);
                                setIsAddModalOpen(false);
                            }}
                        >
                            &times;
                        </span>
                        <h2>{editing ? 'Edit' : 'Add'} Insurance</h2>
                        <form onSubmit={handleSave}>
                            <label style={styles.formLabel}>
                                Insurance ID:
                                <input
                                    type="text"
                                    name="insuranceID"
                                    value={formData.insuranceID}
                                    onChange={handleChange}
                                    required
                                    style={styles.formInput}
                                />
                            </label>
                            <label style={styles.formLabel}>
                                Insurance Type:
                                <input
                                    type="text"
                                    name="insuranceType"
                                    value={formData.insuranceType}
                                    onChange={handleChange}
                                    required
                                    style={styles.formInput}
                                />
                            </label>
                            <label style={styles.formLabel}>
                                Provider:
                                <input
                                    type="text"
                                    name="provider"
                                    value={formData.provider}
                                    onChange={handleChange}
                                    required
                                    style={styles.formInput}
                                />
                            </label>
                            <label style={styles.formLabel}>
                                Policy Number:
                                <input
                                    type="text"
                                    name="policyNumber"
                                    value={formData.policyNumber}
                                    onChange={handleChange}
                                    required
                                    style={styles.formInput}
                                />
                            </label>
                            <label style={styles.formLabel}>
                                Effective Date:
                                <input
                                    type="date"
                                    name="effectiveDate"
                                    value={formData.effectiveDate}
                                    onChange={handleChange}
                                    required
                                    style={styles.formInput}
                                />
                            </label>
                            <label style={styles.formLabel}>
                                Coverage:
                                <input
                                    type="text"
                                    name="coverage"
                                    value={formData.coverage}
                                    onChange={handleChange}
                                    required
                                    style={styles.formInput}
                                />
                            </label>
                            <label style={styles.formLabel}>
                                Premium:
                                <input
                                    type="text"
                                    name="premium"
                                    value={formData.premium}
                                    onChange={handleChange}
                                    required
                                    style={styles.formInput}
                                />
                            </label>
                            <button type="submit" style={styles.formButton}>
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditModalOpen(false);
                                    setIsAddModalOpen(false);
                                }}
                                style={styles.formButton}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InsuranceList;
