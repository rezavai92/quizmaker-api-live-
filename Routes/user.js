const { ObjectId } = require("bson")
const express =require("express")
const Quiz = require('../Model/quiz')
const {body,validationResult} =require('express-validator')
const router = express.Router()
const Student =require('../Model/student')
const Admin = require('../Model/admin')
const jwt = require('jsonwebtoken')

const config = require('config')
const bcrypt = require('bcryptjs')
//const { body, validationResult } = require("express-validator")


//admin signup

router.post('/admin/apr/register',

[body('email').isEmail(),

body("password").isLength({min:5})
],
async (req,res)=>{


    const errors = validationResult(req);

    if(!errors.isEmpty()){

      return   res.status(400).json(errors.array())
    }


    

    const {name,email,password} = req.body;


    try{
    
    const validatingUser = await Admin.findOne({email:email});
    
    if(validatingUser){
    
      return res.status(401).json({"msg":"email already taken"})
    }
    
    
    const newUser = new Admin({
    
      name,
      email,
      password
    });
    
    let s="";
    
    
    let salt =bcrypt.genSaltSync(10);
    
    newUser.password = bcrypt.hashSync(password,salt);
    const u = await newUser.save();
    const payload = {
      user :{
    
          id : u.id
      }
    }
    
    jwt.sign(payload,config.get("jwtSecret"),{expiresIn:"30d"},
      (err,token)=>{
          if(err){
              throw err;
          }

          
           res.json({"token":token})
      }
    )
    
    }
    
    
    catch(error){
    
    res.status(500).json({"msg":"internal server error"})
    }
    
    
      
})



// student sign up

router.post('/register',

[body('email').isEmail(),

body("password").isLength({min:5})
],
async (req,res)=>{
  


    const errors = validationResult(req);

    if(!errors.isEmpty()){

      return   res.status(400).json(errors.array())
    }


    console.log("hello")

    const {name,email,password} = req.body;


    try{
    
    const validatingUser = await Student.findOne({email:email});
    
    if(validatingUser){
    
      return res.status(409).json({"msg":"email already taken"})
    }
    
    
    const newUser = new Student({
    
      name,
      email,
      password
    });
    
    let s="";
    
    
    let salt =bcrypt.genSaltSync(10);
    
    newUser.password = bcrypt.hashSync(password,salt);
    const u = await newUser.save();
    const payload = {
      user :{
    
          id : u.id
      }
    }
    
    jwt.sign(payload,config.get("jwtSecret"),{expiresIn:"30d"},
      (err,token)=>{
          if(err){
              throw err;
          }

          
           res.json({"token":token})
      }
    )
    
    }
    
    
    catch(error){
    
    res.status(500).json({"msg":"internal server error"})
    }
    
    
      
})

module.exports=router