import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import {Form,FormControl,Button} from 'react-bootstrap'
import {Redirect,withRouter} from 'react-router-dom'
import {quizContext} from '../../contexts/quizContext'
import "./signup.css"
const SignUp = (props)=>{

    
    const [name,setName]=useState("");
    const [email,setEmail] = useState("");
    const[willRedirect,setWillRedirect] = useState(false)
    const[password,setPassword] = useState("");
    const {registerUser,loginToken} = useContext(quizContext);
    const [loggedIn,setLoggedIn] = useState(false)
 // console.log("from sign up",loggedIn,loginToken)  
  useEffect(()=>{

    if(loginToken){
      setLoggedIn(true);
     
    }
   // console.log("from signup useEffect")
  },[loginToken])

    const nameChangeHandler =(e)=>{

        setName(e.target.value);
    }

    const emailChangeHandler = (e)=>{
        setEmail(e.target.value)
    }

    const passwordChangeHandler= (e)=>{

        setPassword(e.target.value)
    }
    const formSubmitHandler = (e)=>{

        e.preventDefault();
        
        axios.post('/user/register',{
            name,
            email,
            password
        }).then((res)=>{
          registerUser(res.data.token)
        // console.log(res)
         setName("");
         setPassword("");
         setEmail("");
         setWillRedirect(true);
       // props.hisotry.push('/')
        }).catch((err)=>{
          
         // console.log("hi")
         const targetString= String(err).split("status code")[1];
      //   console.log("target string",targetString)
         if(targetString.includes("409")){

          window.alert("validation error, email address already taken. Try with a different email address")
         }
         else{
           window.alert("internal server error")
         }
        })
        
        
    }

    const render = ()=>{

      return <Redirect to="login" />
    }
return(<div className="signup">


{loginToken?<Redirect to="/" /> : 


   <div> 
     <h1>Sign Up</h1>
     

     <Form action={render} onSubmit={ (e)=>{formSubmitHandler(e)}} >


<Form.Group controlId="formBasicCheckbox">
  <Form.Control value ={name} name="name" 
  required={true}
  onChange={(e)=>{nameChangeHandler(e)} } 
  type="text" placeholder="Enter Name" />
</Form.Group>


<Form.Group controlId="formBasicEmail">
  <Form.Control value={email} name="email" required={true} onChange={(e)=>{emailChangeHandler(e)}} type="email" placeholder="Enter email" />
  <Form.Text className="text-muted">
    We'll never share your email with anyone else.
  </Form.Text>
</Form.Group>


<Form.Group controlId="formBasicPassword">
  
  <Form.Control type="password" placeholder="Password"
  value={password} required={true} onChange={(e)=>{passwordChangeHandler(e)}}  name="password"
  /></Form.Group>

<Button variant="primary" type="submit">
  Submit
</Button>
</Form>
   </div>

}

{willRedirect? render():null}

</div>)

}

export default withRouter(SignUp)