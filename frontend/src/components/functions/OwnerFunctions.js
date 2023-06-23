import React, { useState } from 'react'
import { ethers } from 'ethers'
import web3 from 'web3'
import { Accordion, Form, Button } from 'react-bootstrap'

import realEstate_abi from '../../contract/realEstate_abi'

function OwnerFunctions({ address }) {

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(address, realEstate_abi, signer)

    const [tenant, setTenant] = useState('')
    const [monthsToLimit, setMonthsToLimit] = useState('')
    const [rent, setRent] = useState('')

    const canPayRent = async (event) => {
        event.preventDefault()
        const tx = await contract.canPayRent(tenant)
        console.log(tx)
    }
    const limitadvancedrent = async (event) => {
        event.preventDefault()
        const tx = await contract.limitadvancedrent(monthsToLimit)
        console.log(tx)
    }
    const setRentper30day = async (event) => {
        event.preventDefault()
        const rentInWei = web3.utils.toWei(rent, "ether");
        const tx = await contract.setRentper30Day(rentInWei.toString())
        console.log(tx)
    }

  return (
    <div className='mt-5 w-50 mx-auto'>
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>canPayRent</Accordion.Header>
                <Accordion.Body>
                    <Form className='d-flex flex-column align-items-end'>
                        <Form.Group className="mb-3 w-100" controlId="formBasicText">
                            <Form.Label>_tenant</Form.Label>
                            <Form.Control type="text" placeholder="address" value={tenant} onChange={(e)=>{setTenant(e.target.value)}}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={canPayRent}>
                            Transact
                        </Button>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>limitadvancedrent</Accordion.Header>
                <Accordion.Body>
                    <Form className='d-flex flex-column align-items-end'>
                        <Form.Group className="mb-3 w-100" controlId="formBasicText">
                            <Form.Label>_monthstolimit</Form.Label>
                            <Form.Control type="text" placeholder="uint8" value={monthsToLimit} onChange={(e)=>{setMonthsToLimit(e.target.value)}}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={limitadvancedrent}>
                            Transact
                        </Button>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>setRentper30day</Accordion.Header>
                <Accordion.Body>
                    <Form className='d-flex flex-column align-items-end'>
                        <Form.Group className="mb-3 w-100" controlId="formBasicText">
                            <Form.Label>_rent</Form.Label>
                            <Form.Control type="text" placeholder="uint256" value={rent} onChange={(e)=>{setRent(e.target.value)}}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={setRentper30day}>
                            Transact
                        </Button>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </div>
  )
}

export default OwnerFunctions