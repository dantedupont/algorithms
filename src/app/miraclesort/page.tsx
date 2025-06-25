'use client'

import React, { useState, useRef } from 'react'
import NumberBox from '@/components/ui/Inputs'
import ArrowButton from '@/components/ui/Arrow'
import { motion, AnimatePresence } from 'framer-motion';

export default function MiracleSortPage() {
    const [inputValues, setInputValues] = useState(Array(5).fill(''))
    const [sortedArray, setSortedArray] = useState<number[]>([])
    const [isSorting, setIsSorting] = useState(false)
    const [miracleHappened, setMiracleHappened] = useState(false)
    const [checkCount, setCheckCount] = useState(0); 
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleInputChange = (index: number, value: string) => {
        if(/^\d*$/.test(value) && value.length <= 3) {
            const newValues = [...inputValues]
            newValues[index] = value
            setInputValues(newValues)
        }
    }

    const isSorted = (arr: number[]): boolean => {
        for (let i = 0; i < arr.length - 1; i++){
            if (arr[i] > arr[i + 1]) {
                return false
            }   
        }
        return true
    }

    const handleSort = () => {
        const parsedArray = inputValues.map(v => parseInt(v, 10)).filter(n => !isNaN(n))
        if(parsedArray.length === 0) return;
        setSortedArray(parsedArray) 
        setIsSorting(true)

        if(isSorted(parsedArray)){
            setMiracleHappened(true)
            return
        }
        // now lets wait for a miracle, we'll check every second
        intervalRef.current = setInterval(() => {
            setCheckCount(prev => prev + 1);
            if (isSorted(parsedArray)) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setMiracleHappened(true);
            }
        }, 3000);
    }

    return(
        <main className="max-w-5xl mx-auto p-4 md:p-10">
            <div className="bg-background p-6 md:p-8 relative">
                <h1 className="text-center text-4xl font-bold text-foreground mb-8">Miracle Sort</h1>

                <div className="flex justify-center">

                    <div className="grid grid-cols-[auto_1fr] items-start gap-x-4">
                        
                        {/* --- COLUMN 1 --- */}
                        <p className="text-2xl font-semibold text-foreground pt-4 whitespace-nowrap">Input</p>
                        
                        {/* --- COLUMN 2 --- */}
                        <div className="flex flex-col gap-4 items-start">
                            <div className="flex flex-nowrap justify-start gap-2">
                                {inputValues.map((value, index) => (
                                    <input 
                                        key={index}
                                        type="text"
                                        value={value}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        className="w-16 h-16 border-2 border-rosered rounded-md bg-background text-center font-bold text-2xl focus:outline-none focus:border-steelblue"
                                        maxLength={3}
                                    />
                                ))}
                            </div>
                            <button onClick={handleSort} className="px-8 py-2 bg-rosered text-background font-bold rounded-lg shadow hover:bg-rosered/90">
                                Sort!
                            </button>
                            
                            {/* --- VISUALIZER UI --- */}
                            <AnimatePresence>
                                {isSorting && ( 
                                    <motion.div 
                                        className="w-full border-t-2 border-gray-100 pt-8 mt-4 flex flex-col items-start gap-8"
                                        initial={{ opacity: 0, y:20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className="flex justify-start items-center gap-4">
                                            {sortedArray.map((num, index) => (
                                                <NumberBox key={`sorted-${index}`} number={num} />
                                            ))}
                                        </div>
                                        <div className="w-full flex justify-between items-center max-w-lg">
                                            <ArrowButton onClick={() => {}} direction="left" />
                                            <span className="font-semibold text-gray-500">Step 1 of 1</span>
                                            <ArrowButton onClick={() => {}} direction="right" />
                                        </div>
                                        <div className="mt-6 w-full max-w-md">
                                            {!miracleHappened && <p className="text-center text-gray-500 italic mb-2">Checking for a miracle... (Attempt #{checkCount})</p>}
                                            <div className="p-4 bg-background border-2 border-foreground rounded-lg shadow-lg">
                                                <h3 className="text-center text-gray-700 font-bold mb-1">Wait What?</h3>
                                                <p className="text-center text-gray-700 font-medium mb-2">
                                                    {`This sorting algorithm will only provide a sorted result if a miracle were to happen, 
                                                    such as a cosmic ion hitting an electric circuit while this site's state is being updated!
                                                    It checks for a miracle every 3 seconds.`}
                                                </p>
                                                <p className="text-center text-gray-700 font-medium">
                                                    {`It has a hypothetical time complexity of O(∞).`}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}