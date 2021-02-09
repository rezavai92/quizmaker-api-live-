import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Button,Form} from 'react-bootstrap'
import axios from 'axios'

const ResetPassword = ()=>{

  const [email,setEmail] = useState("");
  const[sent,setSent] = useState(false);
  
  const emailChangeHandler= (e)=>{

    setEmail(e.target.value);
  
  }

  const formSubmitHandler = (e)=>{

    e.preventDefault();
    console.log("hello")
    const postData= async ()=>{

      try{
        console.log(email)
        const res = await axios.post('/user/password/reset/checkEmail',{
          email:email
        })
        setSent(true)
      }
      catch(error){

        console.log(error)
      }
    }
    postData();

  }
    return(<div className="container" >



{
  sent? <div> <p>A link is sent to your email address to reset your password!</p> </div> :

  <Form onSubmit={(e)=>{formSubmitHandler(e)}} >



<Form.Group controlId="formBasicEmail">

  <Form.Label >Email address</Form.Label>
  <Form.Control type="email" value={email} required={true} onChange={(e)=>{emailChangeHandler(e)}} placeholder="Enter email" />
  <Form.Text className="text-muted">
    Please Provide the same email address you used to create your account.
  </Form.Text>
</Form.Group>

<Button type="submit">Submit</Button>
</Form>
}
    </div>)
}

export default ResetPassword