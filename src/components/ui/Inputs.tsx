import React from 'react'

interface NumberBoxProps {
  number: number;
  isPivot?: boolean;
}
const NumberBox = ({ number, isPivot }: NumberBoxProps) => (
    <div className="relative flex items-center justify-center w-16 h-16 rounded-md text-background bg-rosered font-bold text-2xl shadow">
        {number}
        {isPivot && (
            <div className="absolute -top-2 -right-2 text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
            </div>
        )}
    </div>
)

export default NumberBox