const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://kaushallokhande12345:QyYFP6gWA8I8OnKj@cluster0.cseaj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&tls=true"

const connectToMongo= () =>{
    mongoose.connect(mongoURI, () =>{
        console.log("Connect to Mongo Successfully");
    })
}

module.exports  = connectToMongo;