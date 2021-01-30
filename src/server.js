const express = require("express")
const bp = require('body-parser')
const quiz =require('./Routes/quiz')
const user = require('./Routes/user')
const auth = require('./Routes/auth')
const app = express()

const db = require('./config/db')
app.use(express.json())
app.use(bp.urlencoded({extended:true}))

app.use('/quiz',quiz)
app.use('/user',user)
app.use('/auth',auth)
const port = 5000||process.env.PORT
app.listen(port,()=>{

    console.log("app is listening to ",port)
})