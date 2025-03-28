import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../store/features/UserSlice.js';
import io from 'socket.io-client';

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.name);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_SERVER_SOCKET_URL);

        setSocket(newSocket);
        if (socket) {
            return () => {
                socket.off('refreshPresentation', user, presentation._id);
            };
        }
    }, []);

    const handleLogOut = () => {
        dispatch(logOut());
    };

    return (
        <div>
            <header className="bg-cyan-600 mb-8">
                <div className="container mx-auto text-white py-4 flex justify-between items-center">
                    <Link className="text-2xl" to="/">
                        Presently
                    </Link>
                    <div className="flex items-center">
                        <i className="text-xl mr-6">
                            Welcome, <b>{user}</b>
                        </i>
                        <button onClick={handleLogOut} className="alterBtn ">
                            Log out
                        </button>
                    </div>
                </div>
            </header>
            <div className="container mx-auto">{<Outlet />}</div>
        </div>
    );
};

export default Header;
