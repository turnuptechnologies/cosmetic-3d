import React from 'react';


const Loader = ({ text }) => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-90">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mb-4" />
            {text && <span className="text-white text-lg">{text}</span>}
        </div>
    );
};

export default Loader;
