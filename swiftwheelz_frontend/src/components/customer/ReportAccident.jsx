import React, { useEffect, useState } from 'react';
import { getReportsByCustomerId, createAccidentReport, updateAccidentReport, deleteAccidentReportById } from "../../services/AccidentReportService.js"; // Import your service

const ReportAccident = ({ customerId }) => {
    const [reports, setReports] = useState([]);
    const [editingReport, setEditingReport] = useState(null);
    const [formData, setFormData] = useState({
        accidentDate: '',
        description: '',
        location: '',
        damageCost: '',
        truckVin: '',
        customerId: customerId // Include customer ID from the logged-in user
    });

    // Fetch customer-specific reports on page load
    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const response = await getReportsByCustomerId(customerId);
            setReports(response.data);
        } catch (error) {
            console.error("Error fetching reports", error);
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission for create/update
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingReport) {
                // Update existing report
                await updateAccidentReport(editingReport.reportId, formData);
                setEditingReport(null); // Reset editing state
            } else {
                // Create new report
                await createAccidentReport(formData);
            }
            setFormData({
                accidentDate: '',
                description: '',
                location: '',
                damageCost: '',
                truckVin: '',
                customerId: customerId // Reset customerId after form submission
            });
            fetchReports(); // Refresh the list of reports
        } catch (error) {
            console.error("Error saving report", error);
        }
    };

    // Handle edit button click
    const handleEdit = (report) => {
        setEditingReport(report);
        setFormData({
            accidentDate: report.accidentDate,
            description: report.description,
            location: report.location,
            damageCost: report.damageCost,
            truckVin: report.truck.vin,
            customerId: report.customer.customerId
        });
    };

    // Handle delete
    const handleDelete = async (reportId) => {
        try {
            await deleteAccidentReportById(reportId);
            fetchReports(); // Refresh the list of reports
        } catch (error) {
            console.error("Error deleting report", error);
        }
    };

    // Inline styles for the form and table
    const styles = {
        container: {
            padding: '20px',
            maxWidth: '800px',
            margin: '0 auto'
        },
        formGroup: {
            marginBottom: '15px'
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold'
        },
        input: {
            width: '100%',
            padding: '8px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
        },
        button: {
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px'
        },
        th: {
            padding: '10px',
            backgroundColor: '#f4f4f4',
            borderBottom: '2px solid #ddd'
        },
        td: {
            padding: '10px',
            borderBottom: '1px solid #ddd'
        },
        editButton: {
            backgroundColor: '#ffc107',
            color: '#fff',
            padding: '5px 10px',
            marginRight: '5px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
        },
        deleteButton: {
            backgroundColor: '#dc3545',
            color: '#fff',
            padding: '5px 10px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
        },
        response: {
            color: '#28a745', // Green for admin responses
            fontStyle: 'italic',
        }
    };

    return (
        <div style={styles.container}>
            <h1>Swiftwheelz is here to help you.</h1>

            {/* Form for creating/updating reports */}
            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Accident Date</label>
                    <input
                        type="date"
                        name="accidentDate"
                        style={styles.input}
                        value={formData.accidentDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Description</label>
                    <textarea
                        name="description"
                        style={styles.input}
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Location</label>
                    <input
                        type="text"
                        name="location"
                        style={styles.input}
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Damage Cost</label>
                    <input
                        type="number"
                        name="damageCost"
                        style={styles.input}
                        value={formData.damageCost}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Truck VIN</label>
                    <input
                        type="text"
                        name="truckVin"
                        style={styles.input}
                        value={formData.truckVin}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" style={styles.button}>
                    {editingReport ? 'Update Report' : 'Create Report'}
                </button>
            </form>

            {/* List of reports */}
            <h2 className="mt-5">Your History Reports.</h2>
            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Description</th>
                    <th style={styles.th}>Location</th>
                    <th style={styles.th}>Damage Cost</th>
                    <th style={styles.th}>Truck VIN</th>
                    <th style={styles.th}>Admin Response</th> {/* New column for admin response */}
                    <th style={styles.th}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {reports.map((report) => (
                    <tr key={report.reportId}>
                        <td style={styles.td}>{report.reportId}</td>
                        <td style={styles.td}>{report.accidentDate}</td>
                        <td style={styles.td}>{report.description}</td>
                        <td style={styles.td}>{report.location}</td>
                        <td style={styles.td}>{report.damageCost}</td>
                        <td style={styles.td}>{report.truck.vin}</td>
                        <td style={styles.td}>
                            <span style={styles.response}>
                                {report.adminResponse ? report.adminResponse : 'No response yet'}
                            </span>
                        </td>
                        <td style={styles.td}>
                            <button onClick={() => handleEdit(report)} style={styles.editButton}>Edit</button>
                            <button onClick={() => handleDelete(report.reportId)} style={styles.deleteButton}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportAccident;
