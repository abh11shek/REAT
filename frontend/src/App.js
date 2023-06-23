import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ethers } from 'ethers';

import Header from "./components/Header";
import Search from "./components/Search";
import AddProperty from "./components/AddProperty";
import PropertyView from "./components/PropertyView";
import PropertyFunctions from "./components/PropertyFunctions";

function App() {

  const [account, setAccount] = useState(null)

  const loadBlockchainData = async () => {
    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = ethers.utils.getAddress(accounts[0])
      setAccount(account);
    })
  }


  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <Router>
      <div className="App">
        <Header account={account} setAccount={setAccount}/>
          <Routes>
            <Route path='/' element={<Search />} exact />
            <Route path='/addProperty' element={<AddProperty />} exact />
            <Route path='/propertyView/:id' element={<PropertyView />} exact />
            <Route path='/propertyFunctions/:address' element={<PropertyFunctions />} exact />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
