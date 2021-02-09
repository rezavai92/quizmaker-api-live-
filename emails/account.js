require('dotenv').config()
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const generateCode =()=>{
   return parseInt(Math.random()*1000000)

}

const code = generateCode();
  const resetPassword = (recipient,name,token)=>{

    const verLink =`https://nr-quizmaker.herokuapp.com/reset/password/${token}`;
    const msg = {
        to: recipient, // Change to your recipient
        from: 'nijhumreza52@gmail.com', // Change to your verified sender
        subject: 'Password Reset - Quizophile Team',
       html :`<h1> Quizophile</h1> <p>Hello ${name}! We are glad to have you back.Please click on the to link to reset your password.
          the link will redirect to a new page in our site where you can reset your password.
       </p> <a href= ${verLink}>${verLink} </a> `
      
      }

       sgMail.send(msg).then(()=>{
        console.log("sent")

       }).catch((error)=>{
            console.log(error)
       });
     

    
  }

  module.exports={resetPassword}