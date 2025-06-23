'use client'

import { useState } from 'react'
import React from 'react'


export default function Home() {
  const [result, setResult] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [intArray, setIntArray] = useState<number[]>([])
    const [operationCount, setOperationCount] = useState<number | null>(null);

  function GnomeSort(array: Array<number>){
    let operationCount = 0
    let i = 0;
    operationCount++
    while(i < array.length){      
      if(i === 0 || array[i] >= array[i-1]){
        operationCount++
        i++
      } else {
        const temp = array[i]
        array[i] = array[i-1]
        array[i-1] = temp
        operationCount++
        i--
      }
    }
    return {sortedArray: array, operationCount: operationCount};
  }

  function handleClick(){
    const parsedArray = input.split(',').map(e => parseInt(e.trim()), 10).filter(num => !isNaN(num))
    setIntArray(parsedArray)
    const { sortedArray, operationCount: opCount } = GnomeSort([...parsedArray])
    if (sortedArray){
      setResult(sortedArray.join(','))
      setOperationCount(opCount)
    } else {
      setResult(null);
      setOperationCount(null);
      return
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
  if (event.key === 'Enter') {
    handleClick();
  }
}

  return (
    <div>
      <h1>Gnome Sort</h1>
      <p>Input Array: </p>
      <p>{intArray.join(',')}</p>
      <br/>
      <div>
        Input:  
        <input 
          value={input} 
          onKeyDown={handleKeyDown} 
          onChange={(e) => setInput(e.target.value)}
          className="bg-white rounded text-black"
        >
        </input>
      </div>
      <br />
      <button onClick={handleClick} className="">Sort!</button>
      <br />
      <p>Result: {result}</p>
      <br/>
      <p>Operations for answer: {operationCount}</p>
    </div>
  );
}
