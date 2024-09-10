import React from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import Display from './component/Display'

const App = () => {
  const handleClick=()=>{
    console.log('i am safal')
  }

  const handleClick2=()=>{
    console.log('i am clicked')
  }
  return (
    <div>
      <Header />
      <Display
      FirstName='safal'
      LastName='Thapa'
      address='kalanki'
      age={50}
      contact={9861595549}
      onClick={handleClick} />


<Display
      FirstName='safal'
      LastName='Thapa'
      address='kalanki'
      age={50}
      contact={9861595549}
      onClick={handleClick2} />
      <Footer />
    </div>
  )
}

export default App
