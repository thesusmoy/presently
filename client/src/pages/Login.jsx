import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/features/UserSlice.js';

const Login = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleSetName = (e) => {
        setName(e.target.value);
    };

    const handleSetUser = () => {
        if (!name) return alert('Please enter your name');
        dispatch(setUser(name));
    };

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">
                <h2 className="text-3xl font-bold text-center text-cyan-600">Welcome to Presently</h2>
                <p className="text-lg text-center text-gray-500">Please log in to continue</p>

                <div className="flex flex-col space-y-4">
                    <input
                        type="text"
                        value={name}
                        onChange={handleSetName}
                        placeholder="Enter your name"
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 "
                    />
                    <button
                        onClick={handleSetUser}
                        className="w-full py-3 bg-cyan-600 text-white rounded-lg font-semibold border-none hover:bg-cyan-500 hover:text-black focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
                    >
                        Log in
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
