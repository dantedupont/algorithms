import React from 'react'

interface ArrowButtonProps {
    onClick: () => void,
    direction: string
}

const ArrowButton = ({ onClick, direction }: ArrowButtonProps) => (
    <button
        onClick={onClick}
        className="p-3 rounded-full text-foreground bg-background shadow-lg border border-gray-200 transition-colors hover:bg-steelblue hover:text-white transition"
        aria-label={direction === 'left' ? "Previous Step" : "Next Step"}        
    >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={direction === 'left' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
        </svg>
    </button>
)

export default ArrowButton