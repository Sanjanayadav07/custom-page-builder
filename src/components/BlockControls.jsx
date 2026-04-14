import React from 'react';

const BlockControls = ({ onDelete, onDuplicate }) => {
    return (
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-2 shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-200 flex gap-1 z-10">
            
            {/* DELETE */}
            <button
                onClick={onDelete}
                className="p-2 hover:bg-red-100 hover:text-red-600 rounded-lg transition-all duration-200"
                title="Delete block"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>

            {/* DUPLICATE */}
            <button
                onClick={onDuplicate}
                disabled={!onDuplicate}
                className="px-2 py-1 bg-green-100 text-green-600 rounded text-sm disabled:opacity-50"
            >
                Duplicate
            </button>

        </div>
    );
};

export default BlockControls;