import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Button, ListGroup, Table } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'

function PropertyView() {

    const { id } = useParams()

    const [property, setProperty] = useState({
        propertyId: id,
        propertySymbol: "",
        propertyOwner: "",
        contractAddress: "",
        location: "",
        bedroomCount: "",
        bathroomCount: "",
        yearBuilt: ""
      })

    const fetchProperty =  async () => {
        const { data } = await axios.get(`http://127.0.0.1:9000/property/${id}`)
        setProperty(data)
    }

    fetchProperty()

    return (
        <div className='w-75 my-2 d-flex flex-column mx-auto'>
            <Card className='m-2 rounded flex-row align-items-start px-0'>
                <div>
                    <Card.Img src="https://ipfs.io/ipfs/QmQUozrHLAusXDxrvsESJ3PYB3rUeUuBAvVWw6nop2uu7c/1.png" style={{ width: '30rem' }} className='border rounded m-3 pl-0' />
                    <div className='d-flex flex-column align-items-center'>
                        <h1 className='my-0 mb-4 '>AVAILABLE FOR SALE</h1>
                    </div>
                </div>
                <Table className='m-3'>
                    <thead>
                        <tr><th>{property.propertyId}, {property.propertySymbol}</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>{property.contractAddress}</td></tr>
                        <tr><td>{property.propertyOwner}</td></tr>
                        <tr><td>{property.location}</td></tr>
                        <tr><td>{property.bedroomCount} bhk</td></tr>
                        <tr><td>{property.bathroomCount} bathrooms</td></tr>
                        <tr><td>{property.yearBuilt} sq. ft.</td></tr>
                    </tbody>
                    </Table>
            </Card>
            <div className='d-flex flex-row justify-content-center my-2'>
                <Link to={`/propertyFunctions/${property.contractAddress}`} className=' mb-3 px-4'>
                    <Button variant="primary" className='mb-0 rounded' style={{ width: '10rem' }}>Go to Functions</Button>
                </Link>
            </div>
            
            <div style={{ height: '30rem' }}></div>
        </div>
    )
}

export default PropertyView
