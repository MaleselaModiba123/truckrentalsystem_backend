import React, { useState, useEffect } from 'react';
import { getAllComplaints, sendResponse } from '../../services/ComplaintService.js';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Complaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [responseText, setResponseText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const token = localStorage.getItem('token');
    // Fetch complaints on component mount
    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await getAllComplaints(token);
                setComplaints(response.data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching complaints:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
    }, []);

    // Handle the submission of the response to a complaint
    const handleResponseSubmit = async (event) => {
        event.preventDefault();

        if (!selectedComplaint) return;

        try {
            const response = await sendResponse(selectedComplaint.complaintId, responseText);
            console.log('Response from server:', response.data);

            setSuccessMessage('Response submitted successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);

            setSelectedComplaint(null);
            setResponseText('');
        } catch (error) {
            console.error('Error submitting response:', error);
            alert('There was an error submitting your response.');
        }
    };

    if (loading) {
        return <div className="text-center my-5"><div className="spinner-border text-primary"></div> Loading complaints...</div>;
    }

    if (error) {
        return <div className="alert alert-danger text-center" role="alert">Error: {error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center">Customer Complaints</h2>

            {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}

            <div className="row">
                {complaints.length > 0 ? (
                    complaints.map((complaint) => (
                        <div className="col-md-6 mb-4" key={complaint.complaintId}>
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">Complaint ID: {complaint.complaintId}</h5>
                                    <p className="card-text"><strong>Description:</strong> {complaint.description}</p>
                                    <p className="card-text"><strong>Status:</strong> {complaint.status}</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => setSelectedComplaint(complaint)}
                                    >
                                        Respond
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No complaints available.</p>
                )}
            </div>

            {/* Modal for responding to a complaint */}
            {selectedComplaint && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Respond to Complaint ID: {selectedComplaint.complaintId}</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setSelectedComplaint(null)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleResponseSubmit}>
                                    <div className="mb-3">
                                        <textarea
                                            className="form-control"
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
                                            onClick={() => setSelectedComplaint(null)}
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

export default Complaints;
