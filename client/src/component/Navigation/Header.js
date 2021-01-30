import React,{useContext,useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperclip} from '@fortawesome/free-solid-svg-icons'
import {Navbar,Nav,NavDropdown,Form,FormControl,Button} from 'react-bootstrap'
import {quizContext} from '../../contexts/quizContext'
const Navigation = ()=>{

 // console.log("from navigation")

  const {loginToken,loggedInUserId,confirmLogout} = useContext(quizContext)
  
return (<div  >
    <Navbar bg="info" variant="dark"  expand="lg">
  <Navbar.Brand ><h2> Quizophile</h2> </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link ><Link to="/" style={{color:"white"}} ><h4>Home</h4></Link></Nav.Link>
      {loginToken?<Nav.Link ><Link to="/makequiz" style={{color:"white"}}  >
      <h4>Make Quiz</h4>
      </Link></Nav.Link>:null }
      <Nav.Link ><Link to="/answerquiz" style={{color:"white"}}  >
        <h4>Answer Quiz</h4>  
      </Link></Nav.Link>
     
    </Nav>
     
     {!loginToken?
     <Nav>
      <Nav.Link ><Link to="/login" style={{color:"white"}}  ><h4>Log In</h4></Link></Nav.Link> 
      <Nav.Link  ><Link to="/signup" style={{color:"white"}}  ><h4>Sign Up</h4></Link></Nav.Link>
      </Nav> 
      :
      <Nav>
        <Nav.Link><Link to={`/developer/${loggedInUserId}`}
         style={{color:"white"}}   ><h4>User</h4></Link></Nav.Link>
      <Nav.Link ><Link to="/login" style={{color:"white"}}
      onClick={()=>{confirmLogout()}}
       ><h4>Log Out </h4></Link></Nav.Link>
      </Nav>
    }
  </Navbar.Collapse>
</Navbar>
    </div>)

}

export default Navigation