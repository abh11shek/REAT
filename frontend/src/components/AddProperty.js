import React, { useState } from 'react'
import { ethers } from 'ethers';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap'
import env from 'react-dotenv'

import realEstate_abi from '../contract/realEstate_abi'
import realEstate_bin from '../contract/realEstate_bin'

function AddProperty() {

  const [property, setProperty] = useState({
    propertyId: "",
    propertySymbol: "",
    propertyOwner: "",
    contractAddress: "",
    location: "",
    bedroomCount: "",
    bathroomCount: "",
    yearBuilt: ""
  })
  function handle(e) {
    const newProperty = {...property}
    newProperty[e.target.id] = e.target.value
    setProperty(newProperty)
  }

  const provider = new ethers.providers.JsonRpcProvider(env.RPC_URL)
  const gov_wallet = new ethers.Wallet(
    env.GOV_PVT_KEY,
    provider
  )
  console.log(gov_wallet)

  const deployContract = async () => {
    const contractFactory = new ethers.ContractFactory(realEstate_abi, realEstate_bin, gov_wallet)
    console.log("Deploying the contract...")
    const contract = await contractFactory.deploy(
      property.propertyId,
      property.propertySymbol,
      property.propertyOwner,
      10,
      12
    )

    await axios.post("http://127.0.0.1:9000/property", {
      propertyId: property.propertyId,
      propertySymbol: property.propertySymbol,
      propertyOwner: property.propertyOwner,
      contractAddress: contract.address,
      location: property.location,
      bedroomCount: property.bedroomCount,
      bathroomCount: property.bathroomCount,
      yearBuilt: property.yearBuilt
    })
      .then(response => console.log(response))
      .catch(err => console.log('Error: '+err.message))
  }

  return (
    <div className='d-flex flex-column justify-content-center w-75 my-4 mx-auto'>
      <h1 className='mx-auto'>Add Property to the blockchain</h1>
      <Form className=' w-75 my-3 mx-auto'>
        <Row className="mb-3">
          <Form.Group as={Col} >
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" placeholder="Enter Property Id" id="propertyId"
              value={property.propertyId} onChange={(e)=>handle(e)} />
          </Form.Group>

          <Form.Group as={Col} >
            <Form.Label>Type</Form.Label>
            <Form.Control type="text" placeholder="Enter property type" id="propertySymbol"
              value={property.propertySymbol} onChange={(e)=>handle(e)} />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" >
          <Form.Label>Owner</Form.Label>
          <Form.Control placeholder="Enter owner's address" id="propertyOwner"
              value={property.propertyOwner} onChange={(e)=>handle(e)} />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Location</Form.Label>
          <Form.Control placeholder="Enter location" id="location"
              value={property.location} onChange={(e)=>handle(e)} />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} >
            <Form.Label>Bedrooms</Form.Label>
            <Form.Control type="text" placeholder="No. of bedrooms" id="bedroomCount"
              value={property.bedroomCount} onChange={(e)=>handle(e)} />
          </Form.Group>

          <Form.Group as={Col} >
            <Form.Label>Bathrooms</Form.Label>
            <Form.Control type="text" placeholder="No. of bathrooms" id="bathroomCount"
              value={property.bathroomCount} onChange={(e)=>handle(e)} />
          </Form.Group>

          <Form.Group as={Col} >
            <Form.Label>Built up area</Form.Label>
            <Form.Control type="text" placeholder="Sq feet" id="yearBuilt"
              value={property.yearBuilt} onChange={(e)=>handle(e)} />
          </Form.Group>
        </Row>

        <Button className='m-3 w-25 mx-auto' variant="primary" onClick={deployContract}>
          Add Property
        </Button>
      </Form>

    </div>
  )
}

export default AddProperty