import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePresentation, deletePresentationLocally } from '../store/features/PresentationSlice.js';
import SlidePreview from './SlidePreview.jsx';

const PreviewSlideItem = ({ presentation }) => {
    let author = useSelector((state) => state.user.name);
    let dispatch = useDispatch();

    const handleDeletePresentation = () => {
        dispatch(deletePresentationLocally(presentation._id));
        dispatch(deletePresentation(presentation._id));
    };

    return (
        <div className="bg-white border-[1px] border-gray-100 p-6 rounded-lg shadow-md">
            <div className="mb-4 h-40 overflow-hidden">
                <SlidePreview slideData={presentation?.slides[0]} />
            </div>

            <div className="flex justify-between items-start gap-x-2 min-h-12">
                <h3 className="text-xl font-bold">{presentation.title}</h3>
                {author === presentation.author && (
                    <button onClick={handleDeletePresentation} className="alterBtn">
                        Delete
                    </button>
                )}
            </div>
            <p className="text-lg text-gray-600 mb-4">Author: {presentation.author}</p>
            <Link
                to={'/presentation/' + presentation._id}
                className="block bg-primary text-white text-center rounded-lg p-2 w-full hover:opacity-60"
            >
                Join Presentation
            </Link>
        </div>
    );
};

export default PreviewSlideItem;
