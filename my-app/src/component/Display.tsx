import React from 'react'
interface Props {
    FirstName : string,
    LastName ?: string,
    address : string,
    age? : number,
    contact?: number,
    onClick? : any
}

const Display = ({FirstName, LastName , address, age, contact, onClick}:Props) => {
  return (
    <div>
      <p>{FirstName}</p>
      <p>{LastName}</p>
      <p>{address}</p>
      <p>{age}</p>
      <p>{contact}</p>

      <button type='button' onClick={onClick}>click me</button>
    </div>
  )
}

export default Display
