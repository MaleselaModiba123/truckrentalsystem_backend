import React, { useState, useEffect } from 'react';
import { getAllComplaints, sendResponse } from '../../services/ComplaintService.js';

const Complaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [responseText, setResponseText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch complaints on component mount
    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await getAllComplaints();
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


    const handleResponseSubmit = async (event) => {
        event.preventDefault();

        if (!selectedComplaint) return;

        try {
            const response = await sendResponse(selectedComplaint.complaintId, responseText);
            console.log('Response from server:', response.data);

            alert('Response submitted successfully!');
            setSelectedComplaint(null);
            setResponseText('');
        } catch (error) {
            console.error('Error submitting response:', error);
            alert('There was an error submitting your response.');
        }
    };

    if (loading) {
        return <p>Loading complaints...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="complaints-list">
            <h2>Customer Complaints</h2>
            <ul>
                {complaints.length > 0 ? (
                    complaints.map((complaint) => (
                        <li key={complaint.complaintId}>
                            <h3>Complaint ID: {complaint.complaintId}</h3>
                            <p><strong>Description:</strong> {complaint.description}</p>
                            <p><strong>Status:</strong> {complaint.status}</p>
                            <button onClick={() => setSelectedComplaint(complaint)}>Respond</button>
                        </li>
                    ))
                ) : (
                    <p>No complaints available.</p>
                )}
            </ul>

            {/* Display the response form when a complaint is selected */}
            {selectedComplaint && (
                <div className="complaint-response">
                    <h3>Respond to Complaint ID: {selectedComplaint.complaintId}</h3>
                    <form onSubmit={handleResponseSubmit}>
                        <textarea
                            value={responseText}
                            onChange={(e) => setResponseText(e.target.value)}
                            placeholder="Your response"
                            required
                        ></textarea>
                        <button type="submit">Send Response</button>
                        <button type="button" onClick={() => setSelectedComplaint(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Complaints;
