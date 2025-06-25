'use client'

import { useState } from 'react'
import React from 'react'

export default function Home() {
  const [result, setResult] = useState<string | null>(null)
  const [input] = useState('')
  const [intArray, setIntArray] = useState<number[]>([])

  function quickSort(array: Array<number>){
    if(array.length <= 1){
      return array
    }
    const smallHalf = []
    const bigHalf = []
    const equal = []

    const pivot = array[Math.floor(Math.random() * array.length)]

    for(let i = 0; i < array.length; i++){
      if(array[i] < pivot){
        smallHalf.push(array[i])
      } else if (array[i] === pivot) {
        equal.push(array[i])
      } else {
        bigHalf.push(array[i])
      }
    }
    const sortedSmall: Array<number> = quickSort(smallHalf)
    const sortedBig: Array<number> = quickSort(bigHalf)
    return [...sortedSmall, ...equal, ...sortedBig ]
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


  return (
    <main className='max-w-5xl mx-auto p-4 md:p-10'>
      <div>
        <h1>Quick Sort</h1>
        <p>Input Array: </p>
        <p>{intArray.join(',')}</p>
        <br/>
        <div>
          Input:  
        </div>
        <br />
        <button onClick={handleClick} className="">Sort!</button>
        <br />
        <p>Result: {result}</p>
      </div>
    </main>
  );
}
