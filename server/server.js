const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 3000
 const app = express()
app.use(cors())
 app.use(bodyParser.json())
const api = require('./routes/api')
 app.use('/api',api)
 app.get('/',(req,res)=>{
     res.send('Hello')

 })
 app.listen(port,()=>{
     console.log('Server is running on '+port)
 })
