import React, { useState } from 'react'
import { ethers } from 'ethers'
import { Accordion, Form, Button } from 'react-bootstrap'

import realEstate_abi from '../../contract/realEstate_abi'

function PublicFunctions({ address }) {

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(address, realEstate_abi, signer)

    const [owner, setOwner] = useState('')
    const [stakeholder, setStakeHolder] = useState('')
    const [tenant, setTenant] = useState('')

    const showSharesOf = async (event) => {
        event.preventDefault()
        const tx = await contract.showSharesOf(owner)
        alert(tx.toNumber())
    }
    const isStakeHolder = async (event) => {
        event.preventDefault()
        const tx = await contract.isStakeholder(stakeholder)
        alert(tx[0])
    }
    const currentTenantCheck = async (event) => {
        event.preventDefault()
        const tx = await contract.currentTenantCheck(tenant)
        alert(tx[0])
    }

  return (
    <div className='mt-5 w-50 mx-auto'>
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>showSharesOf</Accordion.Header>
                <Accordion.Body>
                    <Form className='d-flex flex-column align-items-end'>
                        <Form.Group className="mb-3 w-100" controlId="formBasicText">
                            <Form.Label>_owner</Form.Label>
                            <Form.Control type="text" placeholder="address" value={owner} onChange={(e)=>{setOwner(e.target.value)}}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={showSharesOf}>
                            Transact
                        </Button>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>isStakeholder</Accordion.Header>
                <Accordion.Body>
                    <Form className='d-flex flex-column align-items-end'>
                        <Form.Group className="mb-3 w-100" controlId="formBasicText">
                            <Form.Label>_address</Form.Label>
                            <Form.Control type="text" placeholder="address" value={stakeholder} onChange={(e)=>{setStakeHolder(e.target.value)}}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={isStakeHolder}>
                            Transact
                        </Button>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>currentTenantCheck</Accordion.Header>
                <Accordion.Body>
                    <Form className='d-flex flex-column align-items-end'>
                        <Form.Group className="mb-3 w-100" controlId="formBasicText">
                            <Form.Label>_tenantcheck</Form.Label>
                            <Form.Control type="text" placeholder="address" value={tenant} onChange={(e)=>{setTenant(e.target.value)}}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={currentTenantCheck}>
                            Transact
                        </Button>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </div>
  )
}

export default PublicFunctions