import React from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { logout } from "../features/authSlice"; // Adjust the path as needed

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Clear Redux state
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="backdrop-blur-lg bg-white/8 border-b border-white/10 shadow-lg relative z-10"
    >
      {/* Using grid for more explicit layout control */}
      <div className="max-w-7xl ml-8 grid grid-cols-3 items-center px-0 py-4 w-full pr-0 mr-0">
        {/* Logo/Title explicitly positioned in first column */}
        <div className="flex items-center space-x-4 col-start-1">
          <motion.div 
            className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30"
            whileHover={{ rotate: 5, scale: 1.05 }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </motion.div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            ReAdmit AI
          </h1>
        </div>
        
        {/* Empty middle column */}
        <div className="col-start-2"></div>
        
        {/* Logout button explicitly positioned in third column with proper right margin */}
        <div className="flex col-start-3 pr-0 ml-[30rem]">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </div>
          </motion.button>
        </div>
      </div>
      
      {/* Additional decorative elements for consistency */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-20 w-60 h-60 bg-blue-600 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute -top-40 -left-20 w-60 h-60 bg-purple-600 rounded-full filter blur-3xl opacity-10"></div>
      </div>
    </motion.header>
  );
};

export default Header;