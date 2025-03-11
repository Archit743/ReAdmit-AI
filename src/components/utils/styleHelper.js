// utils/styleHelpers.js

/**
 * Returns styling information based on the readmission risk level
 * @param {string} riskLevel - The risk level (High, Medium, Low)
 * @returns {Object} Object containing styling classes
 */
export const getRiskLevelStyle = (riskLevel) => {
    if (!riskLevel) {
      return {
        bg: 'bg-gray-700',
        color: 'text-gray-300',
        borderColor: 'border-gray-600',
        icon: 'question-mark',
        description: 'Unknown risk level'
      };
    }
  
    switch (riskLevel.toLowerCase()) {
      case 'high':
        return {
          bg: 'bg-red-900',
          color: 'text-red-200',
          borderColor: 'border-red-700',
          icon: 'alert-triangle',
          description: 'Immediate intervention recommended'
        };
      case 'moderate':
      case 'medium':
        return {
          bg: 'bg-yellow-800',
          color: 'text-yellow-200',
          borderColor: 'border-yellow-700',
          icon: 'alert-circle',
          description: 'Close monitoring required'
        };
      case 'low':
        return {
          bg: 'bg-green-800',
          color: 'text-green-200',
          borderColor: 'border-green-700',
          icon: 'check-circle',
          description: 'Standard follow-up suggested'
        };
      case 'very low':
        return {
          bg: 'bg-blue-800',
          color: 'text-blue-200',
          borderColor: 'border-blue-700',
          icon: 'circle-check',
          description: 'Minimal risk detected'
        };
      default:
        return {
          bg: 'bg-purple-900',
          color: 'text-purple-200',
          borderColor: 'border-purple-700',
          icon: 'help-circle',
          description: `${riskLevel} risk level`
        };
    }
  };
  
  /**
   * Returns styling for risk factor severity
   * @param {number} severity - Severity score (0-1)
   * @returns {Object} Object containing styling classes
   */
  export const getRiskFactorStyle = (severity) => {
    if (severity === null || severity === undefined) {
      return {
        bg: 'bg-gray-800',
        color: 'text-gray-400',
        barColor: 'bg-gray-600'
      };
    }
    
    if (severity >= 0.7) {
      return {
        bg: 'bg-gradient-to-r from-red-900 to-red-800',
        color: 'text-red-200',
        barColor: 'bg-red-500'
      };
    } else if (severity >= 0.4) {
      return {
        bg: 'bg-gradient-to-r from-yellow-900 to-yellow-800',
        color: 'text-yellow-200', 
        barColor: 'bg-yellow-500'
      };
    } else {
      return {
        bg: 'bg-gradient-to-r from-green-900 to-green-800',
        color: 'text-green-200',
        barColor: 'bg-green-500'
      };
    }
  };
  
  /**
   * Returns styling for recommendation priority
   * @param {string} priority - Priority level (high, medium, low)
   * @returns {Object} Object containing styling classes
   */
  export const getRecommendationStyle = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return {
          border: 'border-l-4 border-red-500',
          bg: 'bg-red-900 bg-opacity-20',
          icon: 'priority-high',
          iconColor: 'text-red-400'
        };
      case 'medium':
        return {
          border: 'border-l-4 border-yellow-500',
          bg: 'bg-yellow-900 bg-opacity-20',
          icon: 'priority-medium',
          iconColor: 'text-yellow-400'
        };
      case 'low':
        return {
          border: 'border-l-4 border-green-500',
          bg: 'bg-green-900 bg-opacity-20',
          icon: 'priority-low',
          iconColor: 'text-green-400'
        };
      default:
        return {
          border: 'border-l-4 border-blue-500',
          bg: 'bg-blue-900 bg-opacity-20',
          icon: 'info',
          iconColor: 'text-blue-400'
        };
    }
  };
  
  /**
   * Returns styling for treatment timeline events
   * @param {string} status - Status of the treatment event
   * @returns {Object} Object containing styling classes
   */
  export const getTreatmentEventStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return {
          bg: 'bg-green-900 bg-opacity-30',
          icon: 'check-circle',
          iconColor: 'text-green-400',
          border: 'border-green-700'
        };
      case 'scheduled':
        return {
          bg: 'bg-blue-900 bg-opacity-30',
          icon: 'calendar',
          iconColor: 'text-blue-400',
          border: 'border-blue-700'
        };
      case 'pending':
        return {
          bg: 'bg-yellow-900 bg-opacity-30',
          icon: 'clock',
          iconColor: 'text-yellow-400',
          border: 'border-yellow-700'
        };
      case 'missed':
        return {
          bg: 'bg-red-900 bg-opacity-30',
          icon: 'x-circle',
          iconColor: 'text-red-400',
          border: 'border-red-700'
        };
      default:
        return {
          bg: 'bg-gray-800',
          icon: 'circle',
          iconColor: 'text-gray-400',
          border: 'border-gray-700'
        };
    }
  };
  
  /**
   * Returns a color class based on a value compared to thresholds
   * @param {number} value - The value to evaluate
   * @param {number} normalMin - Minimum threshold for normal range
   * @param {number} normalMax - Maximum threshold for normal range
   * @returns {string} Tailwind text color class
   */
  export const getValueColorClass = (value, normalMin, normalMax) => {
    if (value === null || value === undefined) return 'text-gray-400';
    
    if (value < normalMin) {
      return 'text-blue-300';
    } else if (value > normalMax) {
      return 'text-red-300';
    } else {
      return 'text-green-300';
    }
  };