const express = require("express")
const bp = require('body-parser')
const quiz =require('./Routes/quiz')
const user = require('./Routes/user')
const path = require('path')
const auth = require('./Routes/auth')
const app = express()

const db = require('./config/db')
app.use(express.json())
app.use(bp.urlencoded({extended:true}))

app.use('/quiz',quiz)
app.use('/user',user)
app.use('/auth',auth)
const port = 5000||process.env.PORT;



if(process.env.NODE_ENV==="production"){


    app.use(express.static('client/build'));

    app.get("*",(req,res)=>{

        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    } )
}
app.listen(port,()=>{

    console.log("app is listening to ",port)
})