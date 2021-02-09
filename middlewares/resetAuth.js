const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = async function (req,res,next){

const {token} = req.body;

if(!token){

return    res.status(401).json({msg:"no token,authorization denied"})
}
try{
    const dcoded= await jwt.verify(token,config.get("jwtResetPasswordSecret"));
    console.log("from resetauth",dcoded)
    req.email = dcoded.email;
    next();

}

catch(err){


    res.status(401).json({msg:"invalid token"})
}






}