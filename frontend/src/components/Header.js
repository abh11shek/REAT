import React from 'react'
import { ethers } from 'ethers';

import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header({ account, setAccount }) {

    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account);
    }

    return (
        <>
            <Navbar bg="light" variant="light">
            <div className='container d-flex flex-row'>
                <Nav className="me-auto">
                    <Navbar.Brand href="#" className='h1 pt-2'>REAT</Navbar.Brand>
                    <Nav.Link href="/" className="mx-2">Home</Nav.Link>
                    <Nav.Link href="http://127.0.0.1:5001/" className="mx-2">Evaulate your Property</Nav.Link>
                </Nav>
                <Nav.Link href="/addProperty" className="mx-5">Admin</Nav.Link>
                {account ? (
                    <button className='btn btn-primary px-5' >
                        {account.slice(0, 6) + '...' + account.slice(38, 42)}
                    </button>
                ) : (
                    <button className='btn btn-primary px-5' onClick={connectHandler}>
                        Connect wallet
                    </button>
                )}

            </div>
            </Navbar>
        </>
    );
  }

export default Header