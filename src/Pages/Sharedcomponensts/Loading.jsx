import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="relative">
        {/* Outer Circle */}
        <div className="w-24 h-24 border-4 border-white border-opacity-25 rounded-full"></div>
        
        {/* Inner Spinning Circle */}
        <div className="absolute top-0 left-0 w-24 h-24 border-4 border-t-accent border-opacity-75 rounded-full animate-spin"></div>
        
        {/* Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-semibold">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default Loading;