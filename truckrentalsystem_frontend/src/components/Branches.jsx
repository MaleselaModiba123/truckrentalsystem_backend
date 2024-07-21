import React, { useEffect, useState } from 'react';
import { getAllBranches } from '../services/BranchService';

const Branches = () => {
    const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility
    const [branches, setBranches] = useState([]); // State to store branch data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error state
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // List of branches - replace with actual data from your database or state
    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await getAllBranches();
                setBranches(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchBranches();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading branches: {error.message}</p>;
    }

    return (
        <div className="nav-dropdown">
            <button className="nav-button" onClick={toggleDropdown}>
                Branches
            </button>
            {showDropdown && (
                <div className="dropdown-content">
                    {branches.map((branch) => (
                        <a key={branch.branchId} href={`#${branch.branchName.toLowerCase().replace(' ', '-')}`}>
                            {branch.branchName}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Branches;
