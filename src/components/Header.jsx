import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice"; // Adjust the path as needed

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Clear Redux state
  };

  return (
    <header className="bg-gray-900 border-b border-gray-700 shadow-md">
      <div className="flex items-center justify-between px-6 py-3">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          ReAdmit AI
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="text-gray-300 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
