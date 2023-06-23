import React, { useState } from 'react'
import { ethers } from 'ethers'
import web3 from 'web3'
import { Accordion, Form, Button } from 'react-bootstrap'

import realEstate_abi from '../../contract/realEstate_abi'

function StakeHolderFunctions({ address }) {

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(address, realEstate_abi, signer)

    const [sharesOffered, setSharesOffered] = useState('')
    const [shareSellPrice, setShareSellPrice] = useState('')
    const [sharesToBuy, setSharesToBuy] = useState('')
    const [fromAdd, setFromAdd] = useState('')
    const [ethValue, setEthValue] = useState('')
    const [recipient, setRecipient] = useState('')
    const [amount, setAmount] = useState('')

    const offerShares = async (event) => {
        event.preventDefault()
        const shareSellPriceInWei = web3.utils.toWei(shareSellPrice, "ether"); // specify the value to be sent in wei
        const tx = await contract.offerShares(sharesOffered, shareSellPriceInWei)
        console.log(tx)
    }
    const buyShares = async (event) => {
        event.preventDefault()
        const valueInWei = web3.utils.toWei(ethValue, "ether"); // specify the value to be sent in wei
        const tx = await contract.buyShares(sharesToBuy, fromAdd, { value: valueInWei });
        console.log(tx)
    }
    const transfer = async (event) => {
        event.preventDefault()
        const tx = await contract.transfer(recipient, amount)
        console.log(tx)
    }
    const claimOwnership = async (event) => {
        event.preventDefault()
        const tx = await contract.claimOwnership()
        console.log(tx)
    }
    const withdraw = async (event) => {
        event.preventDefault()
        const tx = await contract.withdraw()
        console.log(tx)
    }

  return (
    <div className='mt-5 w-50 mx-auto'>
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>offerShares</Accordion.Header>
                <Accordion.Body>
                    <Form className='d-flex flex-column align-items-end'>
                        <Form.Group className="mb-3 w-100" controlId="formBasicText">
                            <Form.Label>_sharesOffered</Form.Label>
                            <Form.Control type="text" placeholder="uint256" value={sharesOffered} onChange={(e)=>{setSharesOffered(e.target.value)}}/>
                        <Form.Group className="mb-3 w-100" controlId="formBasicText">
                            <Form.Label>_shareSellPrice</Form.Label>
                            <Form.Control type="text" placeholder="uint256" value={shareSellPrice} onChange={(e)=>{setShareSellPrice(e.target.value)}}/>
                        </Form.Group>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={offerShares}>
                            Transact
                        </Button>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>buyShares</Accordion.Header>
                <Accordion.Body>
                    <Form className='d-flex flex-column align-items-end'>
                        <Form.Group className="mb-3 w-100" controlId="formBasicText">
                            <Form.Label>_sharesToBuy</Form.Label>
                            <Form.Control type="text" placeholder="uint256" value={sharesToBuy} onChange={(e)=>{setSharesToBuy(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3 w-100" controlId="formBasicText">
                            <Form.Label>_from</Form.Label>
                            <Form.Control type="text" placeholder="address" value={fromAdd} onChange={(e)=>{setFromAdd(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3 w-100" controlId="formBasicText">
                            <Form.Label>value</Form.Label>
                            <Form.Control type="text" placeholder="Enter amount of eth" value={ethValue} onChange={(e)=>{setEthValue(e.target.value)}}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={buyShares}>
                            Transact
                        </Button>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>transfer</Accordion.Header>
                <Accordion.Body>
                    <Form className='d-flex flex-column align-items-end'>
                        <Form.Group className="mb-3 w-100" controlId="formBasicText">
                            <Form.Label>_recipient</Form.Label>
                            <Form.Control type="text" placeholder="address" value={recipient} onChange={(e)=>{setRecipient(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3 w-100" controlId="formBasicText">
                            <Form.Label>_amount</Form.Label>
                            <Form.Control type="text" placeholder="uint256" value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={transfer}>
                            Transact
                        </Button>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>claimOwnership</Accordion.Header>
                <Accordion.Body>
                    <Form className='d-flex flex-column align-items-end'>
                        <Button variant="primary" type="submit" onClick={claimOwnership}>
                            Transact
                        </Button>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
                <Accordion.Header>withdraw</Accordion.Header>
                <Accordion.Body>
                    <Form className='d-flex flex-column align-items-end'>
                        <Button variant="primary" type="submit" onClick={withdraw}>
                            Transact
                        </Button>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </div>
  )
}

export default StakeHolderFunctions