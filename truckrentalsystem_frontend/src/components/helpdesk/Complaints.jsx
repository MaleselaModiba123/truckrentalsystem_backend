import React, { useState, useEffect } from 'react';

const Complaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(null); // For error state

    useEffect(() => {
        // Define an async function inside the useEffect to handle the asynchronous operation
        const fetchComplaints = async () => {
            try {
                const response = await fetch('/api/complaints');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setComplaints(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching complaints:', error);
            } finally {
                setLoading(false); // Stop loading regardless of success or failure
            }
        };

        fetchComplaints(); // Call the async function
    }, []); // Empty dependency array means this effect runs once on mount

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
            {selectedComplaint && <ComplaintResponse complaint={selectedComplaint} onClose={() => setSelectedComplaint(null)} />}
        </div>
    );
};

const ComplaintResponse = ({ complaint, onClose }) => {
    const [response, setResponse] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`/api/complaints/${complaint.complaintId}/respond`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ response }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            alert('Response submitted successfully!');
            onClose();
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error submitting your response.');
        }
    };

    return (
        <div className="complaint-response">
            <h3>Respond to Complaint ID: {complaint.complaintId}</h3>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Your response"
                    required
                ></textarea>
                <button type="submit">Send Response</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default Complaints;
