import React from 'react';
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="backdrop-blur-lg bg-white/8 border-t border-white/10 shadow-lg shadow-black/5 relative z-10 mt-8"
    >
      <div className="max-w-7xl mx-auto px-8 py-4 w-full">
        <div className="grid grid-cols-3 items-center">
          {/* Empty first column for balance */}
          
          {/* Copyright text centered */}
          <div className="col-start-2 text-center">
            <p className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              © 2025 Medical Readmission Prediction Tool
            </p>
          </div>
          
          {/* Empty third column for balance */}
          <div className="col-start-3"></div>
        </div>
      </div>
      
      {/* Decorative elements matching header */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 -right-20 w-60 h-60 bg-blue-600 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute -bottom-40 -left-20 w-60 h-60 bg-purple-600 rounded-full filter blur-3xl opacity-10"></div>
      </div>
    </motion.footer>
  );
};

export default Footer;