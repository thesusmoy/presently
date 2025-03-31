import React, { useEffect } from 'react';
import {
    addPresentationSlideLocally,
    deletePresentationSlideLocally,
    setSelectedSlide,
} from '../store/features/PresentationSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const PresentationSlides = ({ presentation, selectedSlide, socket, handlegetPresentationByIdForSocket }) => {
    const user = useSelector((state) => state.user.name);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (socket) {
            socket.on('refreshPresentation', handlegetPresentationByIdForSocket);
            socket.on('deletePresentation', () => navigate('/'));

            return () => {
                socket.off('refreshPresentation');
                socket.off('deletePresentation');
            };
        }
    }, []);

    const handleChangeSlide = (id) => {
        dispatch(setSelectedSlide(id));
    };

    const handleDeleteSlide = (id) => {
        if (socket) {
            if (id === selectedSlide && id === presentation.slides.length - 1) {
                dispatch(setSelectedSlide(0));
            }
            dispatch(deletePresentationSlideLocally(id));
            socket.emit('deletePresentationSlide', presentation._id, id);
        }
    };

    const handleAddSlide = () => {
        if (socket) {
            dispatch(addPresentationSlideLocally());
            socket.emit('addPresentationSlide', presentation._id);
        }
    };

    const handleDeletePresentaion = () => {
        if (socket) {
            socket.emit('deletePresentation', presentation._id);
            navigate('/');
        }
    };

    return (
        <>
            <button onClick={() => navigate('/')} className="bg-primary px-3 py-1 text-white block mb-4">
                Go Back
            </button>
            <h2 className="text-lg font-bold mb-4">All Slides</h2>
            {presentation.slides.map((slide, id) => {
                return (
                    <div
                        key={`${slide._id}-${id}`}
                        className={
                            'text-black w-full flex lg:flex-row flex-col items-center gap-x-2 p-4 mb-4 rounded-lg shadow-md border-[1px] border-gray-100 ' +
                            (selectedSlide === id ? 'bg-cyan-200' : '')
                        }
                    >
                        {' '}
                        <button
                            onClick={() => handleChangeSlide(id)}
                            className="bg-transparent border-none w-full text-black lg:mb-0 mb-1"
                        >
                            Slide {id + 1}
                        </button>
                        {user === presentation.author || !presentation.blackListUsers.includes(user) ? (
                            <button
                                onClick={() => handleDeleteSlide(id)}
                                className="bg-rose-400 border-none text-black"
                            >
                                Delete
                            </button>
                        ) : null}
                    </div>
                );
            })}
            {user === presentation.author || !presentation.blackListUsers.includes(user) ? (
                <button onClick={handleAddSlide} className="bg-cyan-600 px-3 py-1 border-none">
                    Add Slide
                </button>
            ) : null}
        </>
    );
};

export default PresentationSlides;
