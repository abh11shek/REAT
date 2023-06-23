const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const url = 'mongodb+srv://harshabhishek12:gpahsOefRaJsI1VT@propertydetails.2ddoekh.mongodb.net/PropertyDB-API?retryWrites=true&w=majority'

const app = express() 

mongoose
.connect(url)
.then(() => {
    app.listen(9000, () => {
        console.log('Server started on port 9000')
    }) 
})
.catch((err) => {
    console.log(err)
})


app.use(express.json())
app.use(cors({
    origin: '*'
}));

const propertyRouter = require('./routes/propertyRoute')
app.use('/property', propertyRouter)
