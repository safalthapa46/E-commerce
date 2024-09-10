import React, { useState } from 'react'

const Hook = () => {
    const [count, setCount]= useState(0);

    const Increase=()=>{
        setCount(count +1)
    }

    const Decrease=()=>{
        setCount(count -1)
    }
  return (
    <div>
      <div>{count}</div>
      <button onClick={Increase} className='border bg-black text-white px-5 py-2'>Increase</button>
      <div>
      <button onClick={Decrease} className='border bg-black text-white px-5 py-2'>Decrease</button>
      </div>
    </div>
  )
}

export default Hook
