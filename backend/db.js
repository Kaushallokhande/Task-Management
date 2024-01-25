const mongoose = require('mongoose')
const mongoURI = "mongodb://127.0.0.1:27017/iNotes"

const connectToMongo= () =>{
    mongoose.connect(mongoURI, () =>{
        console.log("Connect to Mongo Successfully");
    })
}

module.exports  = connectToMongo;