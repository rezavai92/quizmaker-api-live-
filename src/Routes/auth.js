const express =require('express')
const auth = require('../middlewares/auth')
//const User = require('../../model/user')
const router = express.Router();
//const express =require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
//const os = require('os')
const path = require('path')

//const modelPath=path.join(path.dirname(path.dirname (__dirname)),"model","users.js")
const Admin = require('../Model/admin')
const Student = require('../Model/student');
const { body, validationResult } = require('express-validator');

//get user info
router.get('/student',auth,async(req,res)=>{

    try {
       const user = await Student.findById(req.user.id).select("-password")
       res.json({
           user : user
       })
    }
    catch(err){

        res.status(404).json({
            msg : "not found"
        })
    }

})
//student log out
router.get('/logout',(req,res)=>{

   // console.log("clearing out cookies")
    res.clearCookie("user");
    res.status(200).clearCookie("token").send();
})

//admin log out

router.get('/admin/logout',(req,res)=>{

    // console.log("clearing out cookies")
     res.clearCookie("user");
     res.status(200).clearCookie("token").send(); 
 })
//login (student)

router.post('/student', [

  
    // username must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').exists() 
  ],async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
      
    const {email,password} = req.body;
    
    try{

        const foundUser =await Student.findOne({email});

        if(!foundUser){
            return res.status(404).json({msg : "user not found"})
        }

     const isMatch =  await bcrypt.compare(password,foundUser.password);
     if(isMatch){
        //let salt =bcrypt.genSaltSync(10);
  
       // newUser.password = bcrypt.hashSync(foundUser.password,salt);
        const payload = {
            user :{
    
                id : foundUser.id
            }
        }

        jwt.sign(payload,config.get("jwtSecret"),{expiresIn:"30d"},
        (err,token)=>{
            if(err){
                throw err;
            }
            
            
         res.cookie("token",token).cookie("user",foundUser.id).json({"token":token,"user":foundUser.id})
             
          
        }
    )
        
     }

     else{
         return res.status(404).json({msg : "incorrect password"})
     }
    }

    catch(err){

       
    res.status(400).json({msg:"invalid credentials"})

    }
  
  
  
  
  });

  // get admin user 

  router.get('/admin',auth,async(req,res)=>{

    try {
       const user = await Admin.findById(req.user.id).select("-password")
       res.json({
           user : user
       })
    }
    catch(err){

        res.status(404).json({
            msg : "not found"
        })
    }

})

//student log out
// router.get('/logout',(req,res)=>{

//    // console.log("clearing out cookies")
//     res.clearCookie("user");
//     res.status(200).clearCookie("token").send();
// })


//login (admin)

router.post('/admin', [

  
    // username must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').exists() 
  ],async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
      
    const {email,password} = req.body;
    
    try{

        const foundUser =await Admin.findOne({email});

        if(!foundUser){
            return res.status(404).json({msg : "user not found"})
        }

     const isMatch =  await bcrypt.compare(password,foundUser.password);
     if(isMatch){
        //let salt =bcrypt.genSaltSync(10);
  
       // newUser.password = bcrypt.hashSync(foundUser.password,salt);
        const payload = {
            user :{
    
                id : foundUser.id
            }
        }

        jwt.sign(payload,config.get("jwtSecret"),{expiresIn:"30d"},
        (err,token)=>{
            if(err){
                throw err;
            }
            
            
         res.cookie("token",token).cookie("user",foundUser.id).json({"token":token,"user":foundUser.id})
             
          
        }
    )
        
     }

     else{
         return res.status(404).json({msg : "incorrect password"})
     }
    }

    catch(err){

       
    res.status(400).json({msg:"invalid credentials"})

    }
  
  
  
  
  });


module.exports=router;