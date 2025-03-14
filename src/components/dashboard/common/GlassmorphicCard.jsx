// components/Dashboard/common/GlassmorphicCard.js
import React from 'react';
import { motion } from 'framer-motion';

export const GlassmorphicCard = ({ children, className = "", initialDelay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: initialDelay }}
    className={`backdrop-blur-lg bg-white/8 border border-white/10 rounded-2xl shadow-2xl ${className}`}
  >
    {children}
  </motion.div>
);