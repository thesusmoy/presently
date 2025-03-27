import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    getPresentationById,
    getPresentationByIdForSocket,
    setAllowedToEdit,
    setSelectedSlide,
} from '../store/features/PresentationSlice.js';
import PresentationSlides from '../components/PresentationSlides.jsx';
import SlideEditor from '../components/SlideEditor.jsx';
import UsersInPresentation from '../components/UsersInPresentation.jsx';
import io from 'socket.io-client';
import { getAllowedToEdit } from '../utils/getAllowedToEdit.js';
import downloadExcalidrawAsPDF from '../store/features/downloadExcalidrawAsPDF.js';

const PresentationPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [socket, setSocket] = useState(null);
    const user = useSelector((state) => state.user.name);
    const presentation = useSelector((state) => state.presentation.selectedPresentation);
    const selectedSlide = useSelector((state) => state.presentation.selectedSlice);
    const loading = useSelector((state) => state.presentation.loading);
    const error = useSelector((state) => state.presentation.error);

    useEffect(() => {
        dispatch(setSelectedSlide(0));
        dispatch(getPresentationById(id));
        const newSocket = io(import.meta.env.VITE_SERVER_SOCKET_URL);
        setSocket(newSocket);
    }, []);

    useEffect(() => {
        if (presentation?.blackListUsers) {
            let allowedToEdit = getAllowedToEdit(presentation, user);
            dispatch(setAllowedToEdit(allowedToEdit));
        }
    }, [presentation]);

    function handlegetPresentationByIdForSocket() {
        dispatch(getPresentationByIdForSocket(id));
    }

    const handleDownloadPresentation = () => {
        downloadExcalidrawAsPDF(presentation.slides);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Can't get presentation</div>;
    if (!presentation) return <h1>No presentation founded</h1>;

    return (
        <div className="flex justify-between">
            <div className="w-1/5 p-2 overflow-y-auto">
                <PresentationSlides
                    presentation={presentation}
                    selectedSlide={selectedSlide}
                    socket={socket}
                    handlegetPresentationByIdForSocket={handlegetPresentationByIdForSocket}
                />
            </div>

            <div className="w-3/5 p-2">
                <SlideEditor
                    presentation={presentation}
                    selectedSlide={selectedSlide}
                    socket={socket}
                    handlegetPresentationByIdForSocket={handlegetPresentationByIdForSocket}
                />
            </div>

            <div className="w-1/5 p-2">
                <div>
                    <button className="mb-4" onClick={handleDownloadPresentation}>
                        Download PDF
                    </button>
                </div>

                <UsersInPresentation
                    presentation={presentation}
                    socket={socket}
                    handlegetPresentationByIdForSocket={handlegetPresentationByIdForSocket}
                    presentationId={id}
                />
            </div>
        </div>
    );
};

export default PresentationPage;
