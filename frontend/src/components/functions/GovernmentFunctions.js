import React, { useState } from 'react'
import { Accordion, Form, Button } from 'react-bootstrap'
import { ethers } from 'ethers'

import realEstate_abi from '../../contract/realEstate_abi'

function GovernmentFunctions({ address }) {

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(address, realEstate_abi, signer)

    const [stakeholder, setStakeHolder] = useState('')
    const [x, setX] = useState('')
    const [sPerBlock, setSPerBlock] = useState('')

    const addStakeholder = async (event) => {
        event.preventDefault()
        const tx = await contract.addStakeholder(stakeholder)
        console.log(tx)
    }
    const banStakeholder = async (event) => {
        event.preventDefault()
        const tx = await contract.banStakeholder(stakeholder)
        console.log(tx)
    }
    const setTax = async (event) => {
        event.preventDefault()
        const tx = await contract.setTax(x)
        console.log(tx)
    }
    const SetAvgBlockTime = async (event) => {
        event.preventDefault()
        const tx = await contract.SetAvgBlockTime(sPerBlock)
        console.log(tx)
    }
    const distribute = async (event) => {
        event.preventDefault()
        const tx = await contract.distribute()
        console.log(tx)
    }

  return (
    <div className='mt-5 w-50 mx-auto'>
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>addStakeholder</Accordion.Header>
                <Accordion.Body>
                    <Form className='d-flex flex-column align-items-end'>
                        <Form.Group className="mb-3 w-100" controlId="formBasicText">
                            <Form.Label>_stakeholder</Form.Label>
                            <Form.Control type="text" placeholder="address" value={stakeholder} onChange={(e)=>{setStakeHolder(e.target.value)}}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={addStakeholder}>
                            Transact
                        </Button>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>banStakeholder</Accordion.Header>
                <Accordion.Body>
                    <Form className='d-flex flex-column align-items-end'>
                        <Form.Group className="mb-3 w-100" controlId="formBasicText">
                            <Form.Label>_stakeholder</Form.Label>
                            <Form.Control type="text" placeholder="address" value={stakeholder} onChange={(e)=>{setStakeHolder(e.target.value)}}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={banStakeholder}>
                            Transact
                        </Button>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>setTax</Accordion.Header>
                <Accordion.Body>
                    <Form className='d-flex flex-column align-items-end'>
                        <Form.Group className="mb-3 w-100" controlId="formBasicText">
                            <Form.Label>_x</Form.Label>
                            <Form.Control type="text" placeholder="uint8" value={x} onChange={(e)=>{setX(e.target.value)}}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={setTax}>
                            Transact
                        </Button>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
                <Accordion.Header>SetAvgBlockTime</Accordion.Header>
                <Accordion.Body>
                    <Form className='d-flex flex-column align-items-end'>
                        <Form.Group className="mb-3 w-100" controlId="formBasicText">
                            <Form.Label>_sPerBlock</Form.Label>
                            <Form.Control type="text" placeholder="uint8" value={sPerBlock} onChange={(e)=>{setSPerBlock(e.target.value)}}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={SetAvgBlockTime}>
                            Transact
                        </Button>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
                <Accordion.Header>distribute</Accordion.Header>
                <Accordion.Body>
                    <Form className='d-flex flex-column align-items-end'>
                        <Button variant="primary" type="submit" onClick={distribute}>
                            Transact
                        </Button>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </div>
  )
}

export default GovernmentFunctions