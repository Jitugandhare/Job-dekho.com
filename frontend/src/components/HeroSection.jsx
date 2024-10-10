import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        if (query.trim()) { // Check if the query is not empty
            dispatch(setSearchedQuery(query));
            navigate("/browse");
        }
    };

    return (
        <div className='text-center py-10 md:py-16'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm md:text-base'>No. 1 Job Hunt Platform</span>
                <h1 className='text-4xl md:text-5xl font-bold leading-tight'>
                    Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span>
                </h1>
                <p className='text-lg md:text-xl'>Take your dream job in one day!</p>
                <div className='flex w-full max-w-md mx-auto shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 transition-shadow duration-200 ease-in-out hover:shadow-xl'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full rounded-l-full py-2 px-4 text-base placeholder-gray-400'
                        aria-label="Search for jobs"
                    />
                    <Button 
                        onClick={searchJobHandler} 
                        className="rounded-r-full bg-[#6A38C2] text-white hover:bg-[#5b30a6] transition duration-200 ease-in-out"
                    >
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
