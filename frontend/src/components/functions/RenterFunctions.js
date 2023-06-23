import React, { useState } from 'react'
import { ethers } from 'ethers'
import web3 from 'web3'
import { Accordion, Form, Button } from 'react-bootstrap'

import realEstate_abi from '../../contract/realEstate_abi'

function RenterFunctions({ address }) {

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(address, realEstate_abi, signer)

    const [months, setMonths] = useState('')

    const payRent = async (event) => {
        event.preventDefault()
        
        const rentPer30Day = await contract.rentPer30Day()
        const rentPer30DayInWei = parseInt(rentPer30Day._hex).toString()
        const rentValueInEth = rentPer30DayInWei * months / 1000000000000000000
        const rentValueInWei = web3.utils.toWei(rentValueInEth.toString(), "ether");
        const tx = await contract.payRent(months, { value: rentValueInWei })
        console.log(tx)
    }

  return (
    <div className='mt-5 w-50 mx-auto'>
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>payRent</Accordion.Header>
                <Accordion.Body>
                    <Form className='d-flex flex-column align-items-end'>
                        <Form.Group className="mb-3 w-100" controlId="formBasicText">
                            <Form.Label>_months</Form.Label>
                            <Form.Control type="text" placeholder="uint8" value={months} onChange={(e)=>{setMonths(e.target.value)}}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={payRent}>
                            Transact
                        </Button>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            
        </Accordion>
    </div>
  )
}

export default RenterFunctions