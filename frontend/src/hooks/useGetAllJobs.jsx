import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllJobs = async () => {
            setLoading(true);
            setError(null); // Reset error state
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                } else {
                    setError('Failed to fetch jobs'); // Handle unsuccessful response
                }
            } catch (error) {
                setError(error.message || 'Error fetching jobs'); // Set error state
            } finally {
                setLoading(false); // Set loading to false after fetch is complete
            }
        };

        fetchAllJobs();
    }, [dispatch, searchedQuery]); // Add dispatch and searchedQuery to the dependency array

    return { loading, error }; // Return loading and error states
};

export default useGetAllJobs;
