const express = require('express')
const router = express.Router()

const Property = require('../models/propertyModel')

router.get('/', async(req, res) => {
    try{
        const properties = await Property.find({})
        res.json(properties)
    }catch(err){
        res.send('Error get')
    }
})

router.get('/:propertyId', async(req, res) => {
    try{
        const {propertyId} = req.params;
        const property = await Property.findOne({ propertyId: propertyId})
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
          }
        res.json(property)
    }catch(err){
        res.send('Error get')
    }
})

router.post('/', async(req, res) => {
    try {
        const newProperty = await Property.create(req.body)
        res.status(200).json(newProperty)
    } catch(err) {
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
})

module.exports = router