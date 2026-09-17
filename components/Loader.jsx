import React from 'react';


const Loader = ({ text }) => {
    return (
        <div role="status" aria-live="polite" className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90">
            <div aria-hidden="true" className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mb-4" />
            <span className={text ? "text-white text-lg" : "sr-only"}>{text || "Loading..."}</span>
        </div>
    );
};

export default Loader;
