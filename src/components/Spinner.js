import React from 'react'
import Spinnerr from './Spinner-1s-200px.gif'

const Spinner = () => {
  return (
    <div className='text-center' >
      <img src={Spinnerr} alt='loading' style={{ width: '90px', height: '90px' }} />
    </div>
  )
}

export default Spinner
