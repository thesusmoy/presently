import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserToBlackListLocally, removeUserFromBlackListLocally } from '../store/features/PresentationSlice.js';

const UsersInPresentation = ({ presentation, socket, handlegetPresentationByIdForSocket }) => {
    let user = useSelector((state) => state.user.name);

    let dispatch = useDispatch();

    useEffect(() => {
        if (presentation && socket) {
            socket.emit('joinPresentation', user, presentation._id);
            socket.on('refreshPresentation', handlegetPresentationByIdForSocket);
            return () => {
                socket.off('refreshPresentation');
                socket.emit('leavePresentation');
            };
        }
    }, []);

    const handleAddUserToBlackList = (userItem) => {
        dispatch(addUserToBlackListLocally(userItem));
        socket.emit('addUserToBlacklist', userItem, presentation._id);
    };

    const handleRemoveUserFromBlackList = (userItem) => {
        dispatch(removeUserFromBlackListLocally(userItem));
        socket.emit('removeUserFromBlacklist', userItem, presentation._id);
    };

    return (
        <div>
            <div className="mb-12">
                <h2 className="text-lg font-bold mb-4">Active Users</h2>
                <div className="overflow-y-auto max-h-80">
                    {presentation?.activeUsers
                        .slice()
                        .sort((a, b) => (a === presentation.author ? -1 : b === presentation.author ? 1 : 0))
                        .map((userItem) => (
                            <div
                                key={userItem}
                                className={
                                    'p-4 mb-2 rounded-lg shadow-md flex justify-between items-center bg-primaryBG border-gray-100 border-[1px] ' +
                                    (user === userItem && 'bg-primaryBG')
                                }
                            >
                                <p>
                                    {userItem}{' '}
                                    <span
                                        className={
                                            userItem === presentation.author
                                                ? 'text-blue-500 font-bold'
                                                : presentation.blackListUsers.includes(userItem)
                                                ? 'text-orange-700'
                                                : 'text-green-500'
                                        }
                                    >
                                        {userItem === presentation.author
                                            ? '(Author)'
                                            : presentation.blackListUsers.includes(userItem)
                                            ? '(Viewer)'
                                            : '(Editor)'}
                                    </span>
                                </p>
                                {user === presentation.author &&
                                    user !== userItem &&
                                    (presentation.blackListUsers.includes(userItem) ? (
                                        <button
                                            onClick={() => handleRemoveUserFromBlackList(userItem)}
                                            className="bg-cyan-600 border-none text-white p-2 rounded-lg"
                                        >
                                            Switch to Editor
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleAddUserToBlackList(userItem)}
                                            className="bg-cyan-900 border-none"
                                        >
                                            Switch to Viewer
                                        </button>
                                    ))}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default UsersInPresentation;
