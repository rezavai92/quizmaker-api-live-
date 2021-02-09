import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'


const ResetFinalPassword = ()=>{

const [updatedSuccessfully,setUpdatedSuccessfully] = useState(false);
//const [willUpdatingShow,setWillUpdatingShow] = useState(false);

  const [password,setPassword] = useState("");

  const token = window.location.pathname.split("/")[3];
  
  const passwordChangeHandler= (e)=>{

    setPassword(e.target.value);
  
  }

  const formSubmitHandler = (e)=>{

    e.preventDefault();
    console.log("hello")
    const postData= async ()=>{

      try{
        
   const res=   await  axios.post('/user/reset/password',{
            token:token,
            password:password
        })

        setUpdatedSuccessfully(true)
        
    
      }
      catch(error){

      //  console.log(error);
        window.alert("failed to reset your password, please try again providing proper information!");
      }
    }
    postData();

  }
    return(<div className="container" >


{
    updatedSuccessfully  ? <Modal.Dialog>
    <Modal.Header >
      <Modal.Title>Resetting Password</Modal.Title>
    </Modal.Header>
  
    <Modal.Body>
      <p>Password Updated Successfully</p>
    </Modal.Body>
    <Modal.Footer> 
        <Button variant="primary"  ><Link to="/login" style={{color:"white"}}  >Go back to login page</Link></Button>
    </Modal.Footer>
  </Modal.Dialog>:null
}
{
    !updatedSuccessfully?
    

    <Form onSubmit={(e)=>{formSubmitHandler(e)}} >



<Form.Group controlId="formBasicEmail">

  <Form.Label >New Password</Form.Label>
  <Form.Control type="password" value={password} required={true} onChange={(e)=>{passwordChangeHandler(e)}} placeholder="Enter New Password" />
  <Form.Text className="text-muted">
    Your password should be at least 5 characters long
  </Form.Text>
</Form.Group>

<Button type="submit">Submit</Button>
</Form>
    :null
}
    </div>)
}

export default ResetFinalPassword