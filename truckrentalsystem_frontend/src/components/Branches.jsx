import React, {useEffect, useState} from 'react';
import {getAllBranches} from '../services/BranchService';

const Branches = ({ showDropdown }) => {
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        <React.Fragment>
            {branches.map((branch) => (
                <a key={branch.branchId} className="dropdown-item" href={`#${branch.branchName.toLowerCase().replace(' ', '-')}`}>
                    {branch.branchName}
                </a>
            ))}
        </React.Fragment>
    );
};

export default Branches;
