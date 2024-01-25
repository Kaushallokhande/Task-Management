//npm init
//npm  i express
//npm i mongoose@6.10.0
// we can use Thundre Client alternative (Post man)
//npm i -D nodemon
//npm install --save express-validator
//npm i bcryptjs
//npm install jsonwebtoken
//npm install cors

const connectToMongo = require('./db.js')
connectToMongo();


const express = require('express')
const app = express()
const port = 5000


const cors = require('cors')
app.use(cors())

app.use(express.json())
//routes
app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js'))
app.use('/api/contacts', require('./routes/contacts.js'))

app.listen(port, () => {
  console.log(`iNotesBook backend app listening on port ${port}`)
})