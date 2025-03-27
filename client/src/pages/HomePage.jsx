import React, { useEffect } from 'react';
import PreviewSlideItem from '../components/PreviewSlideItem.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getPresentations } from '../store/features/PresentationSlice.js';
import CreateNewPresentation from '../components/CreateNewPresentation.jsx';

const HomePage = () => {
    const dispatch = useDispatch();
    const presentations = useSelector((state) => state.presentation.presentations);
    const loading = useSelector((state) => state.presentation.loading);

    useEffect(() => {
        dispatch(getPresentations());
    }, []);

    if (loading) return <h1>Loading...</h1>;

    return (
        <div>
            <div className="mb-6">
                <div className="flex justify-between">
                    <h2 className="text-xl font-bold">Available Presentations</h2>
                    <CreateNewPresentation />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {presentations?.map((presentation) => (
                    <PreviewSlideItem key={presentation._id} presentation={presentation} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
