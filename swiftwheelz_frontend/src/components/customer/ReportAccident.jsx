import React, { useContext, useEffect, useState } from 'react';
import {
    findReportsByCustomerId,
    createAccidentReport,
    updateAccidentReport,
    deleteAccidentReportById
} from "../../services/AccidentReportService.js";
import { AuthContext } from "../AuthContext.jsx";

const ReportAccident = () => {
    const [reports, setReports] = useState([]);
    const [editingReport, setEditingReport] = useState(null);
    const { auth } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        accidentDate: '',
        description: '',
        location: '',
        customer: { customerID: auth.customerID }
    });

    // Fetch customer-specific reports on page load
    useEffect(() => {
        if (auth.customerID) {
            fetchReports();
        } else {
            console.error("No customer ID found in auth context.");
        }
    }, [auth.customerID]);

    const fetchReports = async () => {
        try {
            const response = await findReportsByCustomerId(auth.customerID);
            console.log("Reports response:", response); // Log the response
            if (response && response.data) {
                setReports(response.data);
            } else {
                console.error("Unexpected response structure:", response);
            }
        } catch (error) {
            if (error.response) {
                console.error("Error fetching reports", error.response.data);
            } else {
                console.error("Error fetching reports", error.message);
            }
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
            const dataToSend = {
                accidentDate: formData.accidentDate,
                description: formData.description,
                location: formData.location,
                customer: { customerID: auth.customerID }
            };

            if (editingReport) {
                await updateAccidentReport(editingReport.reportId, dataToSend);
                setEditingReport(null); // Reset editing state
            } else {
                await createAccidentReport(dataToSend);
            }

            setFormData({
                accidentDate: '',
                description: '',
                location: '',
                customer: { customerID: auth.customerID }
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
            customer: { customerID: report.customer.customerID }
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
            color: '#28a745',
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
                    <th style={styles.th}>Admin Response</th>
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
