const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema(
    {
        propertyId: {
            type: String,
            required: true
        },
        propertySymbol: {
            type: String,
            required: true
        },
        propertyOwner: {
            type: String,
            required: true
        },
        contractAddress: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        bedroomCount: {
            type: Number,
            required: true
        },
        bathroomCount: {
            type: Number,
            required: true
        },
        yearBuilt: {
            type: Number,
            required: true
        }
    }
)

const Property = mongoose.model('Property', propertySchema)

module.exports = Property