import React, {useEffect, useState} from 'react';
import {getAllAccidentReport, sendResponse} from "../../services/AccidentReportService.js";

const CustomerAccidentReports = () => {
    const [accidentReports, setAccidentReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [responseText, setResponseText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [reportsPerPage] = useState(5); // Number of reports per page
    const [statusFilter, setStatusFilter] = useState('');
    const token = localStorage.getItem('token');

    // Fetch all accident reports
    const fetchReports = async () => {
        try {
            const response = await getAllAccidentReport(token);
            // Sort reports by accidentDate in descending order
            const sortedReports = response.data.sort((a, b) => new Date(b.accidentDate) - new Date(a.accidentDate));
            setAccidentReports(sortedReports);
        } catch (error) {
            setError('Error fetching accident reports');
            console.error('Error fetching accident reports:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const handleResponseSubmit = async (event) => {
        event.preventDefault();
        if (!selectedReport) return;

        try {
            const response = await sendResponse(selectedReport.reportId, responseText, token);
            console.log('Response from server:', response.data);
            setSuccessMessage('Response submitted successfully!');
            await fetchReports();
            setSelectedReport(null);
            setResponseText('');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Error submitting response:', error);
            alert('There was an error submitting your response.');
        }
    };

    // Filter reports by status
    const filteredReports = statusFilter
        ? accidentReports.filter(report =>
            report.status.toLowerCase().includes(statusFilter.toLowerCase())
        )
        : accidentReports;

    // Pagination logic
    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);
    const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

    const styles = {
        container: {
            marginTop: '40px',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
        },
        heading: {
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center',
            color: '#343a40',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '20px',
        },
        th: {
            border: '1px solid #dee2e6',
            padding: '12px',
            backgroundColor: '#e9ecef',
            textAlign: 'left',
        },
        td: {
            border: '1px solid #dee2e6',
            padding: '12px',
        },
        textarea: {
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ced4da',
            marginBottom: '10px',
        },
        filterInput: {
            marginBottom: '20px',
            padding: '8px',
            width: '100%',
            borderRadius: '5px',
            border: '1px solid #ced4da',
        },
        pagination: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px',
        },
        loadingText: {
            fontSize: '18px',
            textAlign: 'center',
            marginTop: '20px',
        },
        errorText: {
            color: 'red',
            fontSize: '16px',
            textAlign: 'center',
        },
        successText: {
            color: 'green',
            fontSize: '16px',
            textAlign: 'center',
            marginBottom: '20px',
        },
    };

    if (loading) return <p style={styles.loadingText}>Loading reports...</p>;
    if (error) return <p style={styles.errorText}>{error}</p>;

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Customer Accident Reports</h2>
            {successMessage && <p style={styles.successText}>{successMessage}</p>}

            {/* Search/Filter Input */}
            <input
                type="text"
                placeholder="Filter by Status"
                style={styles.filterInput}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
            />

            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>Report ID</th>
                    <th style={styles.th}>Customer ID</th>
                    <th style={styles.th}>Accident Date</th>
                    <th style={styles.th}>Description</th>
                    <th style={styles.th}>Location</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Action</th>
                </tr>
                </thead>
                <tbody>
                {currentReports.map((report) => (
                    <tr key={report.reportId}>
                        <td style={styles.td}>{report.reportId}</td>
                        <td style={styles.td}>{report.customer ? report.customer.customerID : 'N/A'}</td>
                        <td style={styles.td}>{report.accidentDate}</td>
                        <td style={styles.td}>{report.description}</td>
                        <td style={styles.td}>{report.location}</td>
                        <td style={styles.td}>{report.status}</td>
                        <td style={styles.td}>
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setSelectedReport(report);
                                    setResponseText(''); // Reset response text
                                }}
                            >
                                Respond
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div style={styles.pagination}>
                <button
                    className="btn btn-secondary"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    style={{margin: '0 5px', borderRadius: '5px'}}
                >
                    Previous
                </button>

                <span>
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    className="btn btn-success"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    style={{margin: '0 5px', borderRadius: '5px'}}
                >
                    Next
                </button>
            </div>

            {/* Modal for responding to a report */}
            {selectedReport && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Respond to Report ID: {selectedReport.reportId}</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setSelectedReport(null)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleResponseSubmit}>
                                    <div className="mb-3">
                                        <textarea
                                            style={styles.textarea}
                                            value={responseText}
                                            onChange={(e) => setResponseText(e.target.value)}
                                            placeholder="Your response"
                                            required
                                            rows="4"
                                        ></textarea>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-success">Send Response</button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => setSelectedReport(null)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerAccidentReports;
