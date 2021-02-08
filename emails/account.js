const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const generateCode =()=>{
   return parseInt(Math.random()*1000000)

}

const code = generateCode();
  const verifyUserEmail = (recipient,name)=>{

    const msg = {
        to: recipient, // Change to your recipient
        from: 'nijhumreza52@gmail.com', // Change to your verified sender
        subject: 'Email Verification - Quizophile Team',
        text: `Hello ${name}! Thank you for joining Quizophile.Before we get started, we need you to verify your  email to make sure we got it right.Your  verification code is ${code}.`
        
      }

     return  sgMail.send(msg);
     

    
  }

  module.exports={verifyUserEmail}