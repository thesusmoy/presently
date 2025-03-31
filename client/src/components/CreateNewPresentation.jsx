import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPresentaion } from '../store/features/PresentationSlice.js';
import { useNavigate } from 'react-router-dom';

const CreateNewPresentation = () => {
    const dispatch = useDispatch();
    const author = useSelector((state) => state.user.name);

    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState('');
    const [allowEdit, setAllowEdit] = useState(true);

    const navigate = useNavigate();

    const handleOpenEditMode = () => {
        setEditMode(true);
    };

    const handleSetTitle = (value) => {
        setTitle(value);
    };

    const handleSetEditable = () => {
        setAllowEdit(!allowEdit);
    };

    const handleCLoseEditBlock = () => {
        setEditMode(false);
    };

    const handleCreateNewPresentation = async () => {
        if (title) {
            await handleCLoseEditBlock();
            let response = await dispatch(
                createPresentaion({
                    author,
                    title,
                    allowEdit,
                })
            );
            if (response.payload) {
                navigate(`/presentation/${response.payload}`);
            }
        }
    };

    return (
        <>
            <button onClick={handleOpenEditMode} className="bg-cyan-600 mt-6 border-none text-white p-3 rounded-lg">
                Create New
            </button>

            {editMode && (
                <div className="fixed z-10 inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96 ">
                        <h2 className="text-xl font-bold mb-4 border-none">Create New Presentation</h2>
                        <div>
                            <label htmlFor="textTitle" className="block mb-2 text-sm font-medium text-gray-600">
                                Title
                            </label>
                            <input
                                value={title}
                                onChange={(e) => handleSetTitle(e.target.value)}
                                id="textTitle"
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                                placeholder="Presentation Title"
                            />

                            <label className="inline-flex items-center">
                                <input
                                    checked={allowEdit}
                                    onChange={handleSetEditable}
                                    type="checkbox"
                                    className="form-checkbox text-primary"
                                />
                                <span className="ml-2 text-gray-600">Allow editing for others</span>
                            </label>

                            <div className="flex justify-between mt-6">
                                <button onClick={handleCLoseEditBlock} type="button" className="alterBtn">
                                    Cancel
                                </button>

                                <button
                                    onClick={handleCreateNewPresentation}
                                    type="submit"
                                    className="bg-cyan-600 text-white p-2 rounded-lg border-none"
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateNewPresentation;
