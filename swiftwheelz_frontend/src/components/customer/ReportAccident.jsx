import React, {useContext, useEffect, useState} from 'react';
import {
    createAccidentReport,
    deleteAccidentReportById,
    getReportsByCustomerEmail,
    updateAccidentReport
} from "../../services/AccidentReportService.js";
import {AuthContext} from "../AuthContext.jsx";
import {Alert, Card, Col, Container, Row, Spinner} from 'react-bootstrap';
import {getCustomerByEmail} from "../../services/CustomerService.js";

const ReportAccident = () => {
    const [reports, setReports] = useState([]);
    const [editingReport, setEditingReport] = useState(null);
    const [formData, setFormData] = useState({
        accidentDate: '',
        description: '',
        location: '',
        customer: {customerID: null}
    });
    const {auth} = useContext(AuthContext);
    const [customer, setCustomer] = useState(null);
    const [loadingReports, setLoadingReports] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [searchStatus, setSearchStatus] = useState(''); // State for search input
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const rowsPerPage = 3;
    // Fetch customer data
    useEffect(() => {
        const fetchCustomerData = async () => {
            if (auth?.email) {
                try {
                    const customerData = await getCustomerByEmail(auth.email, auth.token);
                    setCustomer(customerData);
                } catch (error) {
                    console.error("Error fetching customer data:", error);
                    setError('Error fetching customer data. Please try again.');
                }
            } else {
                setError('Customer email missing. Please log in.');
            }
        };

        fetchCustomerData();
    }, [auth]);

    // Fetch reports
    const fetchReports = async () => {
        if (auth?.email) {
            setLoadingReports(true);
            try {
                const data = await getReportsByCustomerEmail(auth.email, auth.token);
                data.sort((a, b) => new Date(b.accidentDate) - new Date(a.accidentDate));
                setReports(data);
            } catch (error) {
                setError('Error fetching reports. Please try again.');
            } finally {
                setLoadingReports(false);
            }
        }
    };

    // Fetch reports when customer data is available
    useEffect(() => {
        fetchReports();
    }, [auth]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({...prevData, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const customerID = customer?.customerID;
        if (!customerID) {
            setError("Customer ID is not available. Please log in.");
            return;
        }

        const token = auth.token;
        if (!token) {
            setError("Authentication token is missing. Please log in.");
            return;
        }

        const dataToSend = {
            accidentDate: formData.accidentDate,
            description: formData.description,
            location: formData.location,
            customer: {customerID}
        };

        try {
            if (editingReport) {
                await updateAccidentReport(editingReport.reportId, dataToSend, token);
                setSuccess("Report updated successfully!"); // Set success message
                setEditingReport(null); // Reset editing state
            } else {
                await createAccidentReport(dataToSend, token);
                setSuccess("Report submitted successfully!"); // Set success message
            }

            // Clear form fields
            setFormData({
                accidentDate: '',
                description: '',
                location: '',
                customer: {customerID}
            });

            await fetchReports(); // Refresh reports
        } catch (error) {
            console.error("Error saving report:", error);
            setError("Error saving report. Please try again.");
        }

        // Clear success message after 3 seconds
        setTimeout(() => {
            setSuccess(null);
        }, 3000);
    };

    const handleEdit = (report) => {
        setEditingReport(report);
        setFormData({
            accidentDate: report.accidentDate,
            description: report.description,
            location: report.location,
            customer: { customerID: report.customer.customerID }
        });
    };

    const handleDelete = async (reportId) => {
        try {
            await deleteAccidentReportById(reportId, auth.token);
            setSuccess("Report deleted successfully!"); // Set success message
            await fetchReports(); // Refresh reports
        } catch (error) {
            setError("Error deleting report. Please try again.");
        }

        // Clear success message after 3 seconds
        setTimeout(() => {
            setSuccess(null);
        }, 3000);
    };
    // Filter reports by status
    const filteredReports = reports.filter(report =>
        report.status.toLowerCase().includes(searchStatus.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredReports.length / rowsPerPage);
    const indexOfLastReport = currentPage * rowsPerPage;
    const indexOfFirstReport = indexOfLastReport - rowsPerPage;
    const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);

    return (
        <Container className="my-5">
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

                    .search-container {
                        display: flex;
                        align-items: center;
                        max-width: 600px;
                        margin-bottom: 2rem;
                        border: 1px solid #ced4da;
                        border-radius: 4px;
                    }

                    .search-container input {
                        flex: 1;
                        padding: 0.5rem 1rem;
                        border: none;
                        border-radius: 4px;
                        font-size: 1rem;
                        outline: none;
                    }

                    .search-container .search-icon {
                        margin-left: 10px;
                        color: #007bff; /* Icon color */
                        font-size: 1.2rem;
                    }
                    .card {
                        height: 250px; 
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between; 
                    }
                    .card-title {
                        color: #007bff; /* Text color */
                    }
                    .card-text strong {
                        color: #004080; /* Text color */
                    }
                    .form-container {
                        max-width: 800px; 
                        
                    }

                    .form-control {
                        width: 100%; 
                    }
                `}
            </style>
            <h2>Report an Accident</h2>
            <p>We are here to assist you with your accident reports.</p>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Row className="form-container mb-4">
                <Col md={6}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="date"
                        name="accidentDate"
                        className="form-control"
                        value={formData.accidentDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        name="description"
                        placeholder="Describe the accident"
                        className="form-control"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="location"
                        placeholder="Location of the accident"
                        className="form-control"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {editingReport ? 'Update Report' : 'Create Report'}
                </button>
            </form>
                </Col>
            </Row>
            <h1 className="mt-5">Your Accident Reports</h1>
            <div className="search-container mb-4">
                <input
                    type="text"
                    placeholder="Search by status..."
                    value={searchStatus}
                    onChange={(e) => setSearchStatus(e.target.value)}
                />
            </div>
            {loadingReports ? (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="primary"/>
                    <p className="mt-3">Loading reports...</p>
                </div>
            ) : currentReports.length === 0 ? (
                <Alert variant="info">You have not reported any accidents yet.</Alert>
            ) : (
                <Row className="mt-4">
                    {currentReports.map(report => (
                        <Col md={6} lg={4} className="mb-4" key={report.reportId}>
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title>Report ID: {report.reportId}</Card.Title>
                                    <Card.Text>
                                        <strong>Date:</strong> {report.accidentDate}<br/>
                                        <strong>Description:</strong> {report.description}<br/>
                                        <strong>Location:</strong> {report.location}<br/>
                                        <strong>Status:</strong> {report.status}<br/>
                                        <strong>Response:</strong> {report.response || 'N/A'}
                                    </Card.Text>
                                    <button className="btn btn-warning me-2" onClick={() => handleEdit(report)}>Edit
                                    </button>
                                    <button className="btn btn-danger"
                                            onClick={() => handleDelete(report.reportId)}>Delete
                                    </button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
            {/* Pagination Controls */}
            <div className="d-flex justify-content-between mt-4 mb-4">
                <button
                    className="btn btn-secondary"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    className="btn btn-success"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </Container>
    );
};

export default ReportAccident;
