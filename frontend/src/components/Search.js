import React, { useState } from 'react'

import { Container, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Search() {

  const [propertyId, setPropertyId] = useState('')

  function handle(e) {
    setPropertyId(e.target.value)
  }

  return (
    <div className='p'>
      <div className='container mt-5 d-flex flex-column align-items-center'>
        <h1 className='display-5 mt-5'>REAL ESTATE ASSETS TOKENIZATION</h1>
        <h1 className='display-5'></h1>
        <p>
        "Unlock the Future of Real Estate with Blockchain - Your Assets, Your Way!"
        </p>
        <Form className='w-75 mt-5'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control type="email" placeholder="Enter Property ID" value={propertyId} onChange={(e) => handle(e)} />
            </Form.Group>
        </Form>
        
        <Link to={`/propertyView/${propertyId}`} className=' mb-3 px-4'>
            <Button variant="primary" className='px-5' >Search</Button>
        </Link>
      </div>
    </div>
  )
}

export default Search