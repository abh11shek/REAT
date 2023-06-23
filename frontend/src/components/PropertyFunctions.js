import React, { useEffect } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

import OwnerFunctions from './functions/OwnerFunctions'
import PublicFunctions from './functions/PublicFunctions'
import GovernmentFunctions from './functions/GovernmentFunctions'
import RenterFunctions from './functions/RenterFunctions'
import StakeHolderFunctions from './functions/StakeHolderFunctions'

function PropertyFunctions() {

    const { address } = useParams()

    // const provider = new ethers.providers.JsonRpcProvider(env.RPC_URL)
    // const contract = new ethers.Contract(address, realEstate_abi, provider)


    // const [isGov, setIsGov] = useState(false)
    // const [isOwner, setIsOwner] = useState(false)
    // const [isPublic, setIsPublic] = useState(false)
    // const [isRenter, setIsRenter] = useState(false)
    // useEffect(() => {
        
    // }, account)

  return (
    <div className='container'>
        <h1 className='my-3 mx-auto'>Functions by role</h1>
            <Tabs
                defaultActiveKey="profile"
                id="fill-tab-example"
                className="mb-3"
                fill
                >
                <Tab eventKey="Govt" title="Government">
                    <GovernmentFunctions address = {address} />
                </Tab>
                <Tab eventKey="Owner" title="Owner">
                    <OwnerFunctions address = {address}/>
                </Tab>
                <Tab eventKey="Stakeholder" title="Stakeholder">
                    <StakeHolderFunctions address = {address}/>
                </Tab>
                <Tab eventKey="Renter" title="Renter">
                    <RenterFunctions address = {address}/>
                </Tab>
                <Tab eventKey="Public" title="Public">
                    <PublicFunctions address = {address} />
                </Tab>
            </Tabs>
            <div style={{ height: '30rem' }}></div>
    </div>
  )
}

export default PropertyFunctions