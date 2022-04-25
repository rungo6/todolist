const express = require('express')
const mongoose = require('mongoose')
const app = express()


mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

const db = mongoose.connection

db.on('error', () =>{
  console.log('mongodb error')
})
db.once('open', () =>{
  console.log('mongodb connected')
})

app.get('/',(req,res)=>{
  res.send('Hello World')
})

app.listen(3000,()=>{
  console.log('app is running on port 3000.')
})