import React,{useState,useContext} from 'react'
import {Link,Redirect} from 'react-router-dom'

import axios from 'axios'

import {Form,Button} from 'react-bootstrap'
import {quizContext} from '../../contexts/quizContext'

import './login.css'

const Login = ()=>{

    const [email,setEmail]=useState("");
    const[password,setrPassword] = useState("");
    const [redirectHome,setRedirectHome]=useState(false);
  //  const [willShowErrorPage,setWillShowErrorPage] = useState(false)
    const [redirectError,setRedirectError]=useState(false);
    //const [selectedLoginType,setSelectedLoginType] = useState("student")
    const {loginToken,confirmLogin} = useContext(quizContext)

    // const radios = [
    //   { name: "student", value: "student" },
    //   { name: "user", value: "user" },
      
    // ];

   // console.log("from log in")
    
    const render = ()=>{
        if(redirectHome)
       {
       return <Redirect to="makquiz" /> 
    }
    else if (redirectError){
        return <Redirect to="/login/error" />
    }
      }
      
    const emailChangeHandler = (e)=>{
        setEmail(e.target.value)
    }
    const passwordChangeHandler = (e)=>{

        setrPassword(e.target.value)
    }

    const formSubmitHandler = async (e)=>{
        e.preventDefault();

        
        try{
          let loginToken="";

          
           loginToken=await axios.post('/auth/student',{email,password})


          
            

            // console.log("logintoken from login.js",loginToken.data.token)

            // const user = await axios.get('/auth',{

            //     headers:{
            //         xAuthToken:loginToken.data.token
            //     }
            // })
            // console.log("user is",user)

            confirmLogin(loginToken.data.token,);
            setEmail("");
            setrPassword("");
            setRedirectHome(true);
            setRedirectError(false);
        }
        catch(err){
        //    console.log(err)
            setRedirectHome(false)
            setRedirectError(true)
            
        }

        
    }
    return(<div className="login">

    
      {!loginToken?
      <div>
        <h1>Login</h1>
<Form onSubmit={(e)=>{formSubmitHandler(e)}} >



  <Form.Group controlId="formBasicEmail">

    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" value={email} required={true} onChange={(e)=>{emailChangeHandler(e)}} placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" required={true} placeholder="Password"
     value={password} onChange ={(e)=>{passwordChangeHandler(e)}} />
  </Form.Group>
  
  
  
 


  <Button variant="primary" type="submit">
    Log In
  </Button>
  <Link to="/password/reset" style={ {color:"red" }} >
    Forgot Password ?
  </Link>
</Form>
{

render()
}
      </div>
    
    : <Redirect  to ="/" />
    }

    
    </div>)
}

export default Login