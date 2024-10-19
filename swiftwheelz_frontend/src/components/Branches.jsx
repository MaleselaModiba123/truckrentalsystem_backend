import {useEffect} from 'react';
import {getAllBranches} from '../services/BranchService';

const Branches = ({ setBranchesData }) => {

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await getAllBranches();
                setBranchesData(response.data);  // Pass data back to GetQuote component
            } catch (err) {
                console.error('Error fetching branches:', err);
            }
        };

        fetchBranches();
    }, [setBranchesData]);

    return null;
};

export default Branches;
