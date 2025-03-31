import React, { useEffect, useState } from 'react';
import EditorBlock from './EditorBlock.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { editPresentationSlide } from '../store/features/PresentationSlice.js';
import SlidePreview from './SlidePreview.jsx';

const SlideEditor = ({ presentation, selectedSlide, socket, handlegetPresentationByIdForSocket }) => {
    const dispatch = useDispatch();
    let allowedEdit = useSelector((state) => state.presentation.allowedToEdit);
    const [slideContent, setSlideContent] = useState(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        setEditMode(false);
    }, [selectedSlide]);

    useEffect(() => {
        if (socket) {
            socket.on('refreshPresentation', () => handlegetPresentationByIdForSocket(presentation._id));

            return () => {
                socket.off('refreshPresentation');
            };
        }
    }, []);

    const handleStartEditingMode = () => {
        setEditMode(true);
    };

    const handleCancel = () => {
        setEditMode(false);
    };

    useEffect(() => {
        if (slideContent !== null) {
            dispatch(editPresentationSlide(slideContent)); // Update Redux store
            socket.emit('editPresentation', presentation._id, selectedSlide, slideContent); // Emit update via WebSocket
            // handlegetPresentationByIdForSocket(); // Refresh data
        }
    }, [slideContent]);

    return (
        <div>
            <div className="flex justify-between gap-x-4">
                <h2 className="text-lg font-bold mb-4">Title: {presentation.title}</h2>
                {presentation?.slides.length && allowedEdit ? (
                    !editMode ? (
                        <button onClick={handleStartEditingMode}>Edit</button>
                    ) : (
                        <div>
                            <button className="bg-alter border-alter mr-4" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    )
                ) : null}
            </div>

            {presentation?.slides.length ? (
                <p className="text-sm text-gray-600">
                    Slide {selectedSlide + 1} of {presentation.slides.length}
                </p>
            ) : (
                <p className="text-sm text-gray-600">No slides available</p>
            )}

            {presentation?.slides.length ? (
                <>
                    <SlidePreview slideData={presentation?.slides[selectedSlide]} />
                    {editMode && allowedEdit && (
                        <EditorBlock
                            presentation={presentation}
                            selectedSlide={selectedSlide}
                            setSlideContent={setSlideContent}
                        />
                    )}
                </>
            ) : null}
        </div>
    );
};

export default SlideEditor;
