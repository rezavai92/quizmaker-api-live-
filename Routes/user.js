require('dotenv').config()
const { ObjectId } = require("bson")
const sgMail = require('@sendgrid/mail');

//const { response } = require('express');

const express =require("express")
const resetAuth = require('../middlewares/resetAuth')
const {body,validationResult} =require('express-validator')
const router = express.Router()
const {resetPassword} = require('../emails/account')
const Student =require('../Model/student')
const Admin = require('../Model/admin')
const jwt = require('jsonwebtoken')

const config = require('config')


//console.log(process.env.SENDGRID_API_KEY)
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
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


    try{
      const{name,email,password} = req.body;


    const validatingUser = await Student.findOne({email:email});

    if(validatingUser){

      return res.status(409).json({"msg":"email already taken"})
    }



    // verify email

   const code= Math.floor(100000+Math.random()*900000);
   


//creating instance of student
    const newUser = new Student({

      name,
      email,
      password,
      passwordResetToken:null,
      passwordResetTokenExpiration:null
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

          //const verLink = `https://facebook.com/register/verify/${token}`
          const msg = {
            to: email, // Change to your recipient
            from: 'nijhumreza52@gmail.com', // Change to your verified sender
            subject: 'Email Verification - Quizophile Team',
            text: `Hello ${name}! Thank you for joining Quizophile.Take quiz everyday.Feel free to contribute!
            regards!
            Nijhum Reza
            Founder of Quizophile (A online quiz building and sharing platform).
            Mobile : +880-1831309302`
          ,
            
          }
      
            sgMail.send(msg)
       
           res.json({msg:"email sent"})
      }
    )

    }


    catch(error){

    console.log(error)  
    res.status(500).json({"msg":"internal server error"})
    }


}

)
// reset password in action 

router.post('/reset/password',[resetAuth],async(req,res)=>{

  const {token,password} = req.body;

  try{

    const foundUser= await Student.findOne({email:req.email});
  //  console.log(foundUser)
  if(!foundUser){
    return res.status(401).json({msg:"no account with this mail"});


  }
  if(foundUser.passwordResetToken!=token){
    return res.status(401).json({msg:"invalid token"});
  }

  let salt =bcrypt.genSaltSync(10);

    let updatedPassword = bcrypt.hashSync(password,salt);

  const updatedUser = await Student.findByIdAndUpdate(foundUser._id,{passwordResetToken:null,passwordResetTokenExpiration:null,password:updatedPassword},{new:true})
 
 console.log("updated user",updatedUser)
  res.json({msg:"password updated successfully"});  
}

  catch(error){


  }
  
  
  
})


/// reset password request
router.post('/password/reset/checkEmail',async(req,res)=>{



  const {email} = req.body;
  
  const foundUser = await Student.findOne({email:email});

  if(!foundUser){

    return res.status(401).json({"msg":"no account with this email"})
  }
  console.log(foundUser)

  const payload = {
  

      email : foundUser.email
  

  }
  jwt.sign(payload,config.get("jwtResetPasswordSecret"),{expiresIn:"1h"},
  (err,token)=>{
      if(err){
        console.log(err)
        return res.status(500).json({msg:"internal server error"})
      }

      

   Student.findOneAndUpdate({email:email},{passwordResetToken:token,passwordResetTokenExpiration:Date.now()+3600})
   .then((response)=>{
   // console.log(res);
    resetPassword(email,foundUser.name,token);
    res.json({msg:"a link is sent to the given email,user is required to verify this"});

    
   }).catch((error)=>{

    return res.status(500).json({msg:"internal server error"})
   })
     
    
   
      
  }
)


  

})

router.post('/register/verify',async (req,res)=>{

  const {code} = req.body;

  if(verificationCode===code){
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




  }

  else{
    return res.status(401).json({"msg":"verification failed!"})
  }
})

module.exports=router