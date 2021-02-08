import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Button,Form} from 'react-bootstrap'

const ResetPassword = ()=>{
    return(<div className="container" >

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
</Form>
    </div>)
}

export default Error