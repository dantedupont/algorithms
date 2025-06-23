'use client'

import { useState } from 'react'
import React from 'react'


export default function Home() {
  const [result, setResult] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [intArray, setIntArray] = useState<number[]>([])

  function quickSort(array: Array<number>){
    if(array.length <= 1){
      return array
    }
    const smallOrEqualHalf = []
    const bigHalf = []
    const pivot = array[Math.floor(Math.random()*array.length)]

    for(let i = 0; i < array.length; i++){
      if(array[i] <= pivot){
        smallOrEqualHalf.push(array[i])
      } else {
        bigHalf.push(array[i])
      }
    }
    const sortedSmall: Array<number> = quickSort(smallOrEqualHalf)
    const sortedBig: Array<number> = quickSort(bigHalf)
    return [...sortedSmall,  ...sortedBig ]
  }

  function handleClick(){
    const parsedArray = input.split(',').map(e => parseInt(e.trim()), 10).filter(num => !isNaN(num))
    setIntArray(parsedArray)
    const sortedArray = quickSort([...parsedArray])
    if (sortedArray){
      setResult(sortedArray.join(','))
    } else {
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
      <h1>Quick Sort</h1>
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
    </div>
  );
}
